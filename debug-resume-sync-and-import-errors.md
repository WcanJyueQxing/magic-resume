# Debug Session: resume-sync-and-import-errors

## Status: [FIXED - 2026-06-04]

## Errors Observed

### Error 1: Sync Directory NotFoundError
- **Source**: `useResumeStore.ts` - `syncResumeToFile` function
- **Log**: `Sync directory not found, clearing saved handle: NotFoundError: ...`
- **Severity**: Warning (handled gracefully by design)

### Error 2: Import Word Error
- **Source**: `ResumeWorkbench.tsx` - `importResumeFromText` function
- **Log**: `Import word error: Error: 获取文件内容失败`
- **Root Cause**: In `document-parse.ts`, the code was calling `/files/extract/{uploadResult.id}` but:
  1. The `id` field is NOT returned from the upload endpoint
  2. The backend cleans up the temp file and DB record immediately after upload
  3. This caused a 404 error: "获取文件内容失败"

## Fix Applied

**File**: `src/routes/api/document-parse.ts`

**Change**: Removed the unnecessary `/files/extract/{id}` call. The content is already returned in the upload response (`uploadResult.content`). The backend `/files/upload` endpoint already extracts text during upload and returns it directly.

```typescript
// Before (buggy):
const extractResponse = await fetch(`${BACKEND_API}/files/extract/${uploadResult.id}`);
if (!extractResponse.ok) {
  throw new Error("获取文件内容失败");
}

// After (fixed):
const text = uploadResult.content || "";
```

## Remaining Items

### Error 1 (Sync Directory): No action needed
The `NotFoundError` handling in `syncResumeToFile` is correct behavior. When the sync directory becomes inaccessible, it clears the handle and logs a warning. This is intentional graceful degradation.
