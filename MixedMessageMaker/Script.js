// Create an array of greeting phrases
const greetings = [
    "Hello!",
    "Hi there!",
    "Greetings!",
    "Howdy!",
    "Bonjour!"
  ];
  
  // Create an array of subjects
  const subjects = [
    "dog",
    "cat",
    "bird",
    "lizard",
    "turtle"
  ];
  
  // Create an array of actions
  const actions = [
    "running",
    "jumping",
    "dancing",
    "singing",
    "flying"
  ];
  
  // Generate a random index for each array
  const greetingIndex = Math.floor(Math.random() * greetings.length);
  const subjectIndex = Math.floor(Math.random() * subjects.length);
  const actionIndex = Math.floor(Math.random() * actions.length);
  
  // Use the random indices to get random elements from each array
  const greeting = greetings[greetingIndex];
  const subject = subjects[subjectIndex];
  const action = actions[actionIndex];
  
  // Use the random elements to create a message
  const message = `${greeting} I saw a ${subject} ${action} today!`;
  
  // Print the message to the console
  console.log(message);
  