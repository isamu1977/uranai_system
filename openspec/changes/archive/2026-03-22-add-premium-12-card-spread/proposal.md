# Change: Add Premium 12-Card Spread

## Why
The backend currently throws an `IndexError` when a 12-card spread ("premium") is requested because the AI interpretation logic only has positions defined for a 7-card spread.

## What Changes
- Add a defined `SPREAD_12_POSITIONS` mapping to `app/services/draw_service.py`.
- Add `build_premium_spread_prompt` to `app/services/prompt_builder.py` to handle 12 items.
- Update `ReadingService.generate_reading` to use the new premium prompt builder.

## Impact
- Affected specs: ai-interpretation
- Affected code:
  - `app/services/prompt_builder.py`
  - `app/services/draw_service.py`
  - `app/services/reading_service.py`
