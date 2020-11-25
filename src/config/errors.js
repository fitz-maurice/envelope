const errors = {
  signUp: {
    'auth/invalid-email': () => 'Please enter a valid email address.',
    'auth/weak-password': () => 'Please enter a stronger password.',
    'auth/email-already-in-use': () => 'Email already in use.',
  },
  signIn: {
    'auth/invalid-email': () => 'Please enter a valid email address.',
    'auth/user-disabled': () => 'Account disabled, please contact support.',
    'auth/user-not-found': () => 'Wrong account credentials.',
    'auth/wrong-password': () => 'Wrong password, please try again.',
    'auth/too-many-requests': () =>
      'Too many attempts, please try again later.',
  },
};

export {errors};
