/**
 * ============================================================================
 * TEST SEED SCRIPT FOR INFINITE SCROLLING (Exercise 27, optional)
 * ============================================================================
 *
 * PURPOSE:
 * Creates 25 test users (testuser1...testuser25, password "password" for
 * all of them) and one review per user on the apollographql/apollo-client
 * repository. This is needed to have enough data to test infinite scrolling
 * on the SingleRepository screen — with too few reviews the whole list
 * fits on one screen and onEndReached fires immediately without any
 * actual scrolling.
 *
 * THIS FILE IS KEPT IN THE UI REPOSITORY AS DOCUMENTATION/REFERENCE ONLY.
 * It is not executed or imported from the UI codebase — the backend was
 * not written by the author of this repo and is only used as a data
 * source (Apollo Server + SQLite). To actually apply this seed:
 *
 *   1. Copy this file into the backend repository, into the `seeds/`
 *      folder (next to the existing 1_create_users.js,
 *      2_create_repositories.js, 3_create_reviews.js), named:
 *      seeds/4_create_test_reviews.js
 *
 *   2. From the backend repository root (locally), run:
 *      npx knex seed:run --specific=4_create_test_reviews.js
 *
 *   3. (Optional) If you need to re-run ALL seeds on a fresh database
 *      (this deletes ALL users and reviews, including the base
 *      kalle/matti/elina/johndoe/leeroyjenkins users and your own
 *      personal account):
 *      npx knex migrate:latest
 *      npx knex seed:run
 *
 * BEHAVIOR REGARDING EXISTING DATA:
 * By default this script first deletes only its OWN previous test rows
 * (testuser1...testuser25 and their reviews on apollo-client), if they
 * already exist — so the script can be re-run safely (e.g. to change
 * texts/ratings) without manually clearing the database and without
 * risking deletion of the base users or your own account.
 * ============================================================================
 */

const oneMinute = 1000 * 60;

const createDateColumns = (date) => ({
  created_at: date,
  updated_at: date,
});

// Same hash as in seeds/1_create_users.js — plaintext password is "password"
const password = '$2b$10$i6OAqjuT7noL/PrsctZQ7O8FkrZ1Ml9RBHx2ro9PY3hqa2OcW5Ah2';

const apolloClientRepositoryId = 'apollographql.apollo-client';

const testUserIds = Array.from({ length: 25 }, (_, i) => `testuser-${i + 1}-id`);

const reviewTexts = [
  'Great caching mechanism once you understand the normalized store.',
  'Type generation could be smoother, but overall a solid GraphQL client.',
  'Migration from v3 to v4 was surprisingly painless with good docs.',
  'Devtools extension makes debugging cache issues much easier.',
  'Solid choice for large scale apps, the community support is great.',
  'Documentation examples are sometimes outdated compared to the API.',
  'Error handling patterns took a while to get used to, but work well.',
  'Performance is excellent even with deeply nested queries.',
  'Local state management alongside GraphQL feels natural once set up.',
  'Testing utilities are a huge time saver for integration tests.',
  'Bundle size is reasonable given the amount of functionality provided.',
  'SSR support works well with a bit of extra configuration.',
  'Subscriptions setup was straightforward with the provided examples.',
  'Fragment colocation makes components easier to reason about.',
  'Upgrading between major versions required careful reading of changelogs.',
  'Refetching strategies are flexible and cover most use cases well.',
  'Custom field policies gave us fine grained control over caching.',
  'Community plugins fill in gaps that the core library does not cover.',
  'Pagination helpers saved us from writing a lot of boilerplate code.',
  'Error messages could be more descriptive during initial setup.',
  'Works reliably in production with predictable update cycles.',
  'The learning curve is steep at first but pays off quickly.',
  'Great integration with TypeScript once types are properly configured.',
  'Cache normalization occasionally requires manual intervention.',
  'Overall a mature and dependable library for GraphQL clients.',
];

export const seed = async (knex) => {
  // Delete only our own previous test data (reviews first, then users;
  // the foreign key has onDelete: 'cascade' so strict ordering isn't
  // required, but being explicit here is safer and clearer).
  await knex('reviews').whereIn('user_id', testUserIds).del();
  await knex('users').whereIn('id', testUserIds).del();

  const users = [];
  const reviews = [];

  for (let i = 1; i <= 25; i += 1) {
    const userId = `testuser-${i}-id`;
    const reviewId = `${userId}.${apolloClientRepositoryId}`;
    // Inverted on purpose: testuser1 gets the oldest date, testuser25 gets
    // the newest, so the list order is 1 -> 25 (Repository.reviews has no
    // explicit orderBy argument and sorts by created_at by default).
    const date = new Date(Date.now() - (26 - i) * oneMinute);
    const rating = 60 + ((i * 7) % 41); // varied rating between 60-100

    users.push({
      id: userId,
      username: `testuser${i}`,
      password,
      ...createDateColumns(date),
    });

    reviews.push({
      id: reviewId,
      user_id: userId,
      repository_id: apolloClientRepositoryId,
      rating,
      text: reviewTexts[i - 1],
      ...createDateColumns(date),
    });
  }

  await knex('users').insert(users);
  await knex('reviews').insert(reviews);
};