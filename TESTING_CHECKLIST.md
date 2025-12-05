# 📋 Testing Checklist - AI Multi-Mode Feature

## Pre-Testing Setup

- [ ] Backend environment variables configured (`.env` with `AI_API_KEY`)
- [ ] Docker Compose running (`docker-compose up -d`)
- [ ] Frontend development server running (`npm run dev`)
- [ ] Browser opens to `http://localhost:5173`

---

## Unit Tests

### Frontend - `EnhancedVideoPlayer.jsx`

- [ ] **Component Renders**

  - [ ] Video player loads without errors
  - [ ] AI button visible in control bar

- [ ] **State Management**

  - [ ] `aiMode` initializes to "summarize"
  - [ ] `aiResponse` initializes to null
  - [ ] `aiQuestion` initializes to empty string
  - [ ] `aiLoading` initializes to false

- [ ] **Modal Interaction**
  - [ ] Clicking AI button opens modal
  - [ ] Modal shows 5 mode buttons (Ringkas, Jelaskan, Kuis, Latihan, Tanya)
  - [ ] Closing modal clears state

### Backend - `aiController.js`

- [ ] **System Prompts**

  - [ ] `getSystemPrompt("summarize", "id")` returns Indonesian summary prompt
  - [ ] `getSystemPrompt("explain", "en")` returns English explain prompt
  - [ ] All 5 intents supported

- [ ] **API Response Format**
  - [ ] `summarize()` returns `{ summary, tokensUsed, model }`
  - [ ] `ask()` returns `{ answer, tokensUsed, model }`

### API Client - `api_node.js`

- [ ] **Functions Export**
  - [ ] `summarizeWithAI(text, intent, language)` exported
  - [ ] `askAI(question, context, language)` exported
  - [ ] `explainConcept()` convenience function works
  - [ ] `generateQuiz()` convenience function works
  - [ ] `generatePractice()` convenience function works

---

## Integration Tests

### Flow 1: Summarize Mode

```
1. Open lesson
2. Click AI button
3. Modal opens with "📋 Ringkas" pre-selected
4. Loading shows "Membuat ringkasan..."
5. Response displays as bullet points
6. Button "Mode Lain" appears to change mode
```

**Expected Result**: ✅ Brief summary of lesson content

**Validation**:

- [ ] Response time < 10 seconds
- [ ] Text is in Indonesian
- [ ] Contains 3-5 main points
- [ ] Uses clear language

---

### Flow 2: Explain Mode

```
1. Open lesson
2. Click AI button
3. Click "💡 Jelaskan"
4. Wait for response
5. Read detailed explanation
```

**Expected Result**: ✅ Detailed explanation with analogies

**Validation**:

- [ ] Contains at least one analogy
- [ ] Uses real-world examples
- [ ] More detailed than summary
- [ ] Focuses on understanding, not memorization

---

### Flow 3: Quiz Mode

```
1. Open lesson
2. Click AI button
3. Click "❓ Kuis"
4. Wait for response
5. Read question and options
```

**Expected Result**: ✅ Multiple choice question format

**Validation**:

- [ ] Contains 1 question
- [ ] 4 answer options (A, B, C, D or similar)
- [ ] Correct answer highlighted
- [ ] Tests understanding, not just facts

---

### Flow 4: Practice Mode

```
1. Open lesson
2. Click AI button
3. Click "✏️ Latihan"
4. Wait for response
5. Read practice exercise
```

**Expected Result**: ✅ Progressive coding exercises

**Validation**:

- [ ] Exercise is practical
- [ ] Difficulty progression clear (easy → medium → hard)
- [ ] Includes hints or tips
- [ ] Relevant to current lesson

---

### Flow 5: Ask Mode

```
1. Open lesson
2. Click AI button
3. Click "🗣️ Tanya"
4. See input field appear
5. Type: "Bagaimana cara membuat div responsif?"
6. Click "Kirim Pertanyaan"
7. Wait for response
```

**Expected Result**: ✅ Contextual answer to specific question

**Validation**:

- [ ] Input field appears when "Tanya" selected
- [ ] "Kirim Pertanyaan" button works
- [ ] Response addresses the specific question
- [ ] Uses lesson context in answer
- [ ] Button disabled if input empty

---

## UX Tests

### Responsiveness

- [ ] Modal displays correctly on mobile (< 640px)
- [ ] Modal displays correctly on tablet (640px - 1024px)
- [ ] Modal displays correctly on desktop (> 1024px)
- [ ] Mode buttons are easily clickable on all sizes

### Dark Mode

- [ ] Modal styled correctly in dark mode
- [ ] Text contrast meets WCAG standards
- [ ] Buttons visible in both themes

### Error Handling

- [ ] Network error shows graceful message
- [ ] AI API key missing shows user-friendly error
- [ ] Timeout (> 30 seconds) shows "Timed out" message
- [ ] User can retry failed requests

### Performance

- [ ] First response < 10 seconds
- [ ] Subsequent responses < 8 seconds (caching benefit)
- [ ] UI remains responsive while loading
- [ ] No memory leaks from rapid mode switching

---

## Backend Tests

### API Validation

- [ ] Empty text returns 400 error
- [ ] Invalid intent defaults to "summarize"
- [ ] Invalid language defaults to "id"
- [ ] Missing API key returns 500 error

### Rate Limiting

- [ ] Can make 10 AI requests per hour
- [ ] 11th request within hour returns 429 error
- [ ] Different users have separate rate limits

### Token Tracking

- [ ] Each response logs token usage
- [ ] Token count updates in database
- [ ] Cost calculation accurate (`tokens × rate`)

---

## Security Tests

### Authentication

- [ ] AI endpoints require valid JWT token
- [ ] Unauthenticated requests return 401
- [ ] Invalid token returns 401

### Input Validation

- [ ] XSS attempts in text field blocked
- [ ] Oversized inputs (> 10KB) rejected
- [ ] SQL injection attempts safe

### Rate Limiting

- [ ] Cannot bypass per-IP rate limits
- [ ] Per-user limits work correctly
- [ ] Tokens are securely validated

---

## Database Tests

### Progress Tracking

- [ ] Each AI request logged in `activity_logs`
- [ ] AI response stored (optional)
- [ ] Token usage counted correctly
- [ ] Timestamp recorded accurately

---

## Documentation Tests

- [ ] `AI_FEATURE_GUIDE.md` is clear and complete
- [ ] All endpoints documented with examples
- [ ] Troubleshooting section covers common issues
- [ ] Code examples are runnable

---

## End-to-End Scenarios

### Scenario 1: Student Learning Path

```
1. Student logs in ✅
2. Opens "HTML Dasar" lesson ✅
3. Watches first step ✅
4. Uses AI Ringkas to understand ✅
5. Uses AI Jelaskan for deep dive ✅
6. Uses AI Kuis to test knowledge ✅
7. Uses AI Tanya for specific question ✅
8. Completes lesson ✅
9. Logs out ✅
```

**Expected Result**: ✅ All 5 AI modes work seamlessly in learning flow

---

### Scenario 2: Network Resilience

```
1. Student has slow network (3G)
2. Clicks AI mode (shows loading) ✅
3. Request takes 15 seconds
4. Response finally arrives ✅
5. UI doesn't freeze
6. Student can still navigate ✅
```

**Expected Result**: ✅ Graceful handling of slow networks

---

### Scenario 3: Error Recovery

```
1. Student clicks AI (API is down)
2. Error message shows ✅
3. Student can still close modal ✅
4. Student can retry after API recovers ✅
5. System logs error for debugging ✅
```

**Expected Result**: ✅ Graceful degradation

---

## Deployment Tests

- [ ] Build production Docker image succeeds
- [ ] Environment variables set in production
- [ ] AI endpoints accessible in production
- [ ] Rate limiting works in production
- [ ] Error logs sent to monitoring service
- [ ] Performance metrics tracked

---

## Sign-Off Criteria

✅ **All tests must pass for release**:

- [ ] All unit tests passing
- [ ] All integration flows working
- [ ] UX meets standards
- [ ] Performance acceptable
- [ ] Security validated
- [ ] Documentation complete
- [ ] Deployment successful

---

## Notes & Observations

| Test           | Result  | Notes | Status |
| -------------- | ------- | ----- | ------ |
| Summarize Mode | Pending |       | ⏳     |
| Explain Mode   | Pending |       | ⏳     |
| Quiz Mode      | Pending |       | ⏳     |
| Practice Mode  | Pending |       | ⏳     |
| Ask Mode       | Pending |       | ⏳     |
| Performance    | Pending |       | ⏳     |
| Security       | Pending |       | ⏳     |

---

## Test Results Summary

```
Total Tests: 50+
Passed:      0
Failed:      0
Skipped:     0
Status:      🔄 PENDING
```

_Last Updated: [Current Date]_
