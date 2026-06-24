# TaskFlow Agent Notes

Build TaskFlow as a beginner-friendly Expo React Native to-do app backed by Supabase.

Follow the seven course phases:

1. Environment Setup
2. Supabase Setup
3. React Native UI Fundamentals
4. State and Hooks
5. Supabase CRUD
6. Componentization
7. Navigation, Modals, and Notifications

Keep code simple JavaScript/JSX where possible. Supabase credentials belong in `lib/supabase.js` and should use the Project URL plus anon public key, never a service role key.

Expected task row shape:

```js
{ id, title, completed, created_at }
```

Keep Supabase calls in screens or data helpers, not presentational components. Use `FlatList`, Material Icons, Expo Router, modal add-task flow, and Toast confirmations.
