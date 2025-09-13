# Language Files

This directory contains language-specific JSON files for the application.

## Current Languages
- `en.json` - English
- `ur.json` - Urdu
- `ar.json` - Arabic
- `fr.json` - French (example)

## Adding New Languages

To add a new language:

1. Create a new JSON file with the language code (e.g., `fr.json` for French)
2. Copy the structure from `en.json` and translate all text values
3. Update the `supportedLanguages` array in `/server/api/data.ts`
4. Test the new language by calling the API with `?lang=fr`

## File Structure

Each language file should have the same structure:
```json
{
  "header": {
    "logo": { "text": "...", "description": "..." },
    "search": { "placeholder": "...", "button": "..." },
    "navigation": { "store": "...", "home": "..." },
    "meta": { "title": "...", "description": "...", "keywords": "..." }
  },
  "footer": {
    "social": { "title": "...", "icons": [...] },
    "copyright": { "text": "...", "company": "..." }
  },
  "trusted": { "title": "..." },
  "services": {
    "title": "...",
    "items": [
      { "icon": "...", "title": "...", "description": "..." }
    ]
  }
}
```

## API Usage

- Default: `/api/data` (returns English)
- Specific language: `/api/data?lang=ur` (returns Urdu)
- All supported languages: `/api/data?lang=ar` (returns Arabic), `/api/data?lang=fr` (returns French)
