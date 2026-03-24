# Design: Add Inline Lead Magnet Widget

## Context

The lead magnet widget is the most critical conversion point for capturing user interest. It must balance:
- **Immediate value**: Give users a real tarot experience
- **Curiosity gap**: Show enough to intrigue, but not enough to satisfy
- **Visual harmony**: Fit seamlessly into the existing "Dark Elegance" hero section

## Architectural Decisions

### 1. Component Location
**Decision**: Create `FreeDrawWidget.svelte` as a standalone component in `frontend/src/lib/components/`

**Rationale**:
- Keeps logic isolated from the complex hero section
- Reusable if we want to add the widget elsewhere later
- Easier to test and maintain

### 2. Backend Integration
**Decision**: Use existing `/api/v1/readings/generate` endpoint with `spread_type: "lead_magnet"`

**Rationale**:
- No backend changes required for MVP
- Lead magnet prompt already exists in the codebase
- Consistent with the existing reading flow

**Request payload**:
```json
{
  "spread_type": "lead_magnet",
  "user_name": "ゲスト",
  "focus_area": "彼の気持ち",
  "language": "ja"
}
```

### 3. Text Truncation Strategy
**Decision**: Client-side truncation by sentence count (first 2 sentences)

**Rationale**:
- Simple to implement and maintain
- Works with any AI response format
- No backend changes needed

**Implementation**:
```javascript
const sentences = text.split(/[。.]/).filter(s => s.trim().length > 0);
const truncated = sentences.slice(0, 2).join('') + '...';
```

### 4. CSS Fade Mask
**Decision**: Use `mask-image` gradient for fade-to-transparent effect

**Rationale**:
- Clean, modern visual effect
- Works well with the "Dark Elegance" theme
- Better than hard text cutoff

**CSS**:
```css
.fade-mask {
  mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
}
```

### 5. Localization Approach
**Decision**: Support JA (primary) and EN (secondary) only for MVP

**Rationale**:
- Matches the user's requirement
- Reduces initial complexity
- PT-BR can be added later if needed

**Language detection**: Use existing `$locale` store from `trilingual-engine` spec

### 6. LINE CTA URL
**Decision**: Use placeholder `https://line.me/` with clear comment for future replacement

**Rationale**:
- LINE Official Account does not exist yet
- Clear marker for future update
- Prevents broken links

## UI/UX Flow

```
[Initial State]
┌─────────────────────────────┐
│   [Card Back Image]         │
│   ✨ subtle glow            │
│   "彼の本音を 1 枚占う"       │
└─────────────────────────────┘

[Loading State]
┌─────────────────────────────┐
│   🔄 pulse animation        │
│   "AI が読み解いています..." │
└─────────────────────────────┘

[Result State]
┌─────────────────────────────┐
│   [Card Flipped]            │
│   愚者 (The Fool)           │
│   ─────────────────         │
│   あなたの彼は今、心の整理   │
│   をつけている段階です。    │
│   無理に連絡を取ろうと...    │
│   [fade to transparent]     │
│   ─────────────────         │
│   [LINE CTA Button]         │
│   "LINE で全文を無料で読む"  │
└─────────────────────────────┘
```

## Trade-offs Considered

### Option A: Server-side truncation
- **Pros**: Less data transfer, consistent truncation logic
- **Cons**: Requires backend changes, less flexible
- **Decision**: Rejected for MVP simplicity

### Option B: Full text with "Read more" expand
- **Pros**: More value for users
- **Cons**: Reduces LINE conversion incentive
- **Decision**: Rejected to maintain gap technique

### Option C: Hardcoded mock responses
- **Pros**: No backend dependency
- **Cons**: Less authentic, harder to maintain trilingual
- **Decision**: Rejected in favor of real API integration

## Testing Strategy

1. **Unit Test**: Verify sentence truncation logic
2. **Visual Test**: Confirm flip animation on mobile (320px width)
3. **Integration Test**: Call backend API and handle errors gracefully
4. **i18n Test**: Switch between JA/EN and verify all labels update

## Future Considerations

- Add PT-BR localization when needed
- Implement actual LINE OA URL when account is created
- Consider A/B testing widget placement (hero vs. after empathy section)
- Track conversion metrics (widget clicks → LINE follows)
