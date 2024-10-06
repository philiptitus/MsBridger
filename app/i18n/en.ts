const en = {
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
    logOut: "Log Out", // @demo remove-current-line
  },
  welcomeScreen: {
    postscript:
      "I am a Budget Planner Powered By Google's Gemini AI, To meet all your financial Plans I will handle everything for you, you dont have to worry about anything just talk to me and i will handle the rest ok?",
    readyForLaunch: "Hi there My Name is Bridger, Your Very Own AI Budget Planner",
    exciting: "Let's start planning your budget shall we?",
    letsGo: "Ok Bridger!", // @demo remove-current-line
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RESET APP",
    traceTitle: "Error from %{name} stack", // @demo remove-current-line
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },
  // @demo remove-block-start
  errors: {
    invalidEmail: "Invalid email address.",
  },
  loginScreen: {
    signIn: "Sign In",
    enterDetails:
      "Hi there, Welcome Back",
    emailFieldLabel: "Email",
    passwordFieldLabel: "Password",
    emailFieldPlaceholder: "Enter your email address",
    passwordFieldPlaceholder: "Super secret password here",
    tapToSignIn: "Sign In",
    tapToSignUp: "Sign Up",

    hint: "Hint: you can use any email address and your favorite password :)",
  },


editProfile: {
    title: "ACCOUNT MANAGER",
    enterDetails: "Update Your Profile Details Below.",
    hint: "Hint: Ensure your password is strong.",
    nameFieldLabel: "Name",
    nameFieldPlaceholder: "Enter your name",
    emailFieldLabel: "Email",
    emailFieldPlaceholder: "Enter your email",
    passwordFieldLabel: "Password",
    passwordFieldPlaceholder: "Enter your password",
    tapToUpdate: "Update Profile",
    logout: "Logout"
  },


  newIncomeScreen: {
    title: "New Income",
    enterDetails: "Please enter the details of your new income below.",
    amountFieldLabel: "Amount",
    amountFieldPlaceholder: "Enter the amount",
    sourceFieldLabel: "Source",
    sourceFieldPlaceholder: "Enter the source",
    descriptionFieldLabel: "Description",
    descriptionFieldPlaceholder: "Enter a description",
    submit: "Submit"
  }
,

  signUpScreen: {
    signIn: "Sign Up",
    enterDetails:
      "Hi New Here Lets Get Started Shall we ?",
    emailFieldLabel: "Email",
    usernameFieldLabel: "Username",
    confirmPasswordFieldLabel: "Confirm Password",

    passwordFieldLabel: "Password",
    emailFieldPlaceholder: "Enter your email address",
    passwordFieldPlaceholder: "Super secret password here",
    usernameFieldPlaceholder: "Enter your username",
    confirmPasswordFieldPlaceholder: "Confirm Your Password",

    tapToSignIn: "I have an Account Already",
    tapToSignUp: "Sign Up",

    hint: "Hint: you can use any email address and your favorite password :)",
  },
  demoNavigator: {
    componentsTab: "Bridger",
    debugTab: "Dev Resources",
    communityTab: "Account Manager",
    podcastListTab: "Notifications",
  },
  demoCommunityScreen: {
    title: "Connect with the community",
    tagLine:
      "Plug in to Infinite Red's community of React Native engineers and level up your app development with us!",
    joinUsOnSlackTitle: "Join us on Slack",
    joinUsOnSlack:
      "Wish there was a place to connect with React Native engineers around the world? Join the conversation in the Infinite Red Community Slack! Our growing community is a safe space to ask questions, learn from others, and grow your network.",
    joinSlackLink: "Join the Slack Community",
    makeIgniteEvenBetterTitle: "Make Ignite even better",
    makeIgniteEvenBetter:
      "Have an idea to make Ignite even better? We're happy to hear that! We're always looking for others who want to help us build the best React Native tooling out there. Join us over on GitHub to join us in building the future of Ignite.",
    contributeToIgniteLink: "Contribute to Ignite",
    theLatestInReactNativeTitle: "The latest in React Native",
    theLatestInReactNative: "We're here to keep you current on all React Native has to offer.",
    reactNativeRadioLink: "React Native Radio",
    reactNativeNewsletterLink: "React Native Newsletter",
    reactNativeLiveLink: "React Native Live",
    chainReactConferenceLink: "Chain React Conference",
    hireUsTitle: "Hire Infinite Red for your next project",
    hireUs:
      "Whether it's running a full project or getting teams up to speed with our hands-on training, Infinite Red can help with just about any React Native project.",
    hireUsLink: "Send us a message",
  },
  demoShowroomScreen: {
    jumpStart: "BRIDGER AI🤖",
    lorem2Sentences:
      "Nulla cupidatat deserunt amet quis aliquip nostrud do adipisicing. Adipisicing excepteur elit laborum Lorem adipisicing do duis.",
    demoHeaderTxExample: "Yay",
    demoViaTxProp: "Via `tx` Prop",
    demoViaSpecifiedTxProp: "Via `{{prop}}Tx` Prop",
  },
  demoDebugScreen: {
    howTo: "HOW TO",
    title: "DEVELOPER RESOURCES",
    tagLine:
      "Congratulations, you've got a very advanced React Native app template here.  Take advantage of this boilerplate!",
    reactotron: "MORE INFORMATION",
    reportBugs: "Report Any Issues",
    demoList: "Demo List",
    demoPodcastList: "Demo Podcast List",
    androidReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running, run adb reverse tcp:9090 tcp:9090 from your terminal, and reload the app.",
    iosReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    macosReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    webReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    windowsReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
  },
  demoPodcastListScreen: {
    title: "React Native Radio episodes",
    onlyFavorites: "Only Show Favorites",
    favoriteButton: "Favorite",
    unfavoriteButton: "Unfavorite",
    accessibility: {
      cardHint:
        "Double tap to listen to the episode. Double tap and hold to {{action}} this episode.",
      switch: "Switch on to only show favorites",
      favoriteAction: "Toggle Favorite",
      favoriteIcon: "Episode not favorited",
      unfavoriteIcon: "Episode favorited",
      publishLabel: "Published {{date}}",
      durationLabel: "Duration: {{hours}} hours {{minutes}} minutes {{seconds}} seconds",
    },
    noFavoritesEmptyState: {
      heading: "This looks a bit empty",
      content:
        "No favorites have been added yet. Tap the heart on an episode to add it to your favorites!",
    },
  },
  // @demo remove-block-end
}

export default en
export type Translations = typeof en
