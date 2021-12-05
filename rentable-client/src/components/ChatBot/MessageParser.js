// MessageParser starter code
class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    console.log(message)
    const lowercase = message.toLowerCase();
    if(lowercase.includes("hello")){
        this.actionProvider.greet();
    }
    else if(lowercase.includes("goodbye") || lowercase.includes("bye")){
      this.actionProvider.goodbye();
    }
    else if(lowercase.includes("car")){
        this.actionProvider.handleCar();
    }
    else if(lowercase.includes("apartment")){
      this.actionProvider.handleApartment();
    }
    else if(lowercase.includes("service")){
      this.actionProvider.handleService();
    }
    else if(lowercase.includes("contact") || message.includes("speak") || message.includes("talk") || message.includes("communicate")){
      this.actionProvider.handleContact();
    }
    else if(lowercase.includes("order") || lowercase.includes("history")){
      this.actionProvider.handleHistory();
    }
    else{
      this.actionProvider.unknown();
    }
  }
}

export default MessageParser;