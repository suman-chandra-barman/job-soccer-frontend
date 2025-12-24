# Agent Rating Feature

## Overview

The Agent Rating feature allows candidates to rate agents based on their experience. Only employers with the role "agent" can be rated by candidates, and each candidate can only rate an agent once.

## Files Created

### 1. API Integration

**File**: `src/redux/features/agentRating/agentRatingApi.ts`

Handles all API calls for agent rating functionality:

- `rateAgent` - Submit a new rating (POST)
- `getAgentAverageRating` - Get average rating for an agent (GET)
- `checkUserRatedAgent` - Check if user has rated an agent (GET)

**Exports**:

```typescript
useRateAgentMutation;
useGetAgentAverageRatingQuery;
useLazyGetAgentAverageRatingQuery;
useCheckUserRatedAgentQuery;
useLazyCheckUserRatedAgentQuery;
```

### 2. Redux Slice

**File**: `src/redux/features/agentRating/agentRatingSlice.ts`

Manages local rating state with actions:

- `setRatingStatus` - Update rating status
- `clearRatingStatus` - Clear rating status

### 3. Custom Hook

**File**: `src/hooks/useAgentRating.ts`

Provides all rating logic and validation:

```typescript
useAgentRating({
  agentUserId: string;
  agentRole?: string;
  agentUserType?: string;
})
```

**Returns**:

- User info: `isLoggedIn`, `isCandidate`
- Rating data: `averageRating`, `totalRatings`, `userRating`, `hasRated`
- Loading states: `isLoading`, `isRating`
- Functions: `canRate()`, `submitRating(rating)`

### 4. UI Component

**File**: `src/components/shared/AgentRatingComponent.tsx`

Complete rating component with:

- Average rating display
- Star rating input (interactive)
- User's existing rating display
- Error and success messages
- Loading states

## Business Rules

### Who Can Rate

- ✅ **Candidates**: Can rate agents they have worked with
- ❌ **Employers**: Cannot rate
- ❌ **Self-rating**: Users cannot rate themselves

### What Can Be Rated

- ✅ **Agents**: Only employers with role "agent"
- ❌ **Other users**: Candidates, other employers cannot be rated

### Rating Constraints

- Rating must be between 1 and 5 stars
- Each candidate can only rate an agent once
- Ratings cannot be edited after submission
- Ratings cannot be deleted

## Usage

### Basic Implementation

```typescript
import { AgentRatingComponent } from "@/components/shared/AgentRatingComponent";

export default function AgentProfilePage({ agent }: { agent: Agent }) {
  return (
    <div>
      <h1>
        {agent.firstName} {agent.lastName}
      </h1>

      <AgentRatingComponent
        agentUserId={agent._id}
        agentRole={agent.role}
        agentUserType={agent.userType}
        onSuccess={() => console.log("Rating submitted!")}
      />
    </div>
  );
}
```

### Using the Hook Directly

```typescript
import { useAgentRating } from "@/hooks/useAgentRating";

export function CustomRatingComponent({ agentId }: { agentId: string }) {
  const {
    averageRating,
    totalRatings,
    hasRated,
    userRating,
    isCandidate,
    isLoading,
    canRate,
    submitRating,
  } = useAgentRating({
    agentUserId: agentId,
    agentRole: "agent",
    agentUserType: "employer",
  });

  if (!isCandidate) return null;

  return (
    <div>
      <p>Average Rating: {averageRating.toFixed(1)} ⭐</p>
      <p>Total Ratings: {totalRatings}</p>

      {!hasRated && canRate().allowed && (
        <button onClick={() => submitRating(5)}>Rate 5 Stars</button>
      )}

      {hasRated && <p>You rated: {userRating} ⭐</p>}
    </div>
  );
}
```

## API Endpoints

### 1. Create Rating

```
POST /api/v1/agent-rating
Authorization: Bearer <token>

Request Body:
{
  "agentUserId": "691ab87550eaae95d0ca3ce8",
  "rating": 5
}

Response (201):
{
  "success": true,
  "message": "Agent rated successfully",
  "data": {
    "_id": "69499f02e24d0109e9cc1979",
    "agentUserId": "691ab87550eaae95d0ca3ce8",
    "ratedByUserId": {...},
    "ratedByUserType": "candidate",
    "ratedByUserRole": "Professional Player",
    "rating": 5,
    "createdAt": "2025-12-22T19:41:54.198Z"
  }
}
```

### 2. Get Average Rating

```
GET /api/v1/agent-rating/average/:agentUserId
(No authentication required)

Response (200):
{
  "success": true,
  "message": "Agent average rating retrieved successfully",
  "data": {
    "averageRating": 4.5,
    "totalRatings": 25
  }
}
```

### 3. Check User Rating Status

```
GET /api/v1/agent-rating/check/:agentUserId
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "message": "User has rated this agent",
  "data": {
    "hasRated": true,
    "rating": {
      "_id": "69499f02e24d0109e9cc1979",
      "agentUserId": {...},
      "rating": 5,
      "createdAt": "2025-12-22T19:41:54.198Z"
    }
  }
}
```

## Error Handling

### Common Errors

- **400 Bad Request**: Invalid rating (not 1-5) or invalid agent ID format
- **401 Unauthorized**: User not logged in
- **403 Forbidden**: User is not a candidate or agent cannot be rated
- **404 Not Found**: Agent user not found
- **409 Conflict**: User has already rated this agent

## Updated Files

The following files were updated to support the rating feature:

1. **src/redux/api/baseApi.ts** - Added "Agent" to tagTypes
2. **src/redux/store.ts** - Added agentRatingReducer to store

## Integration Points

### On Agent Profile Page

```typescript
// Employer profile page showing agent details
<AgentRatingComponent
  agentUserId={employer._id}
  agentRole={employer.role}
  agentUserType={employer.userType}
/>
```

### On Agent Cards/Listings

```typescript
// Display average rating on agent cards
<useGetAgentAverageRatingQuery agentId={agent._id} />
```

### For Candidates Viewing Agent Profiles

```typescript
// Check if candidate has already rated
<useCheckUserRatedAgentQuery agentId={agent._id} />;

// Allow new rating if not already rated
{
  !hasRated && <RatingStars onRate={handleRate} />;
}
```

## Caching Strategy

- **Average ratings**: Cached for 5 minutes
- **Check user rating**: Real-time (no cache)
- Cache automatically invalidates when new rating is submitted

## TypeScript Types

```typescript
interface AgentRating {
  _id: string;
  agentUserId: string | AgentUser;
  ratedByUserId: string | RatedByUser;
  ratedByUserType: string;
  ratedByUserRole: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

interface CreateRatingRequest {
  agentUserId: string;
  rating: number;
}

interface AverageRatingResponse {
  averageRating: number;
  totalRatings: number;
}

interface CheckRatingResponse {
  hasRated: boolean;
  rating: AgentRating | null;
}
```

## Future Enhancements

- Edit ratings after submission
- Delete ratings
- View rating history
- Filter agents by rating
- Rating comments/reviews
- Helpful votes on ratings
- Rating analytics dashboard
