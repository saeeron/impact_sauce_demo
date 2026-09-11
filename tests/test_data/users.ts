export interface TestUser {
  username: string;
  password: string;
}

// Test Creds Must not be included in public repo. However, we are including because these are public on sauce demo.
export const usersArray: TestUser[] = [
  { username: 'standard_user', password: 'secret_sauce'},
  { username: 'locked_out_user', password: 'secret_sauce'},
  { username: 'problem_user', password: 'secret_sauce' },
  { username: 'performance_glitch_user', password: 'secret_sauce' },
  { username: 'error_user', password: 'secret_sauce' },
  { username: 'visual_user', password: 'secret_sauce' }
];
