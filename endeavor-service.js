class EndeavorService {
  constructor() {
    this.surveyResult = {
      id: 'generate survey result id'
    }
    this.history = ['0', '1', '2', '3', '4', '6']; // list of section IDs
    this.currentHistoryIndex = 5;
  }

  getNextSection() {
    // get next section based on this.survey answers
    // push current section to history
    // update currentSection with new section ID
  }

  getPreviousSection() {
    // get previous section
  }

  saveAnswer(answer) {
    // add the answer to this.survey
    // save this.surveyResult to localStorage
    // update an existing answer
  }

  saveUserEmail(email) {
    // save users email
  }

  getChecklist() {
    // get tasks based on answers
  }
}
