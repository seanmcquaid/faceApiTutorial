import React, {Component} from 'react';
import './App.css';
import * as faceapi from "face-api.js";

class App extends Component {

  state = {
    distance : 0
  }

  loadModels = async () => {
    const MODEL_URL = '/models'

    await faceapi.loadSsdMobilenetv1Model(MODEL_URL)
    await faceapi.loadFaceLandmarkModel(MODEL_URL)
    await faceapi.loadFaceRecognitionModel(MODEL_URL)
  }

  componentDidMount = async () => {
    console.log("LOADING")
    await this.loadModels();
    console.log("DONE")

    const brandonImage = await faceapi.fetchImage("/images/brandon.jpg");
    const michaelImage = await faceapi.fetchImage("/images/michael.jpg");

    const brandonDescriptor = await faceapi.allFacesSsdMobilenetv1(brandonImage);
    const michaelDescriptor = await faceapi.allFacesSsdMobilenetv1(michaelImage);
    await console.log(brandonDescriptor);
    await console.log(michaelDescriptor);

    const distance = faceapi.round(
      faceapi.euclideanDistance(
        brandonDescriptor[0].descriptor,
        michaelDescriptor[0].descriptor
      )
    )

    this.setState({
      distance : distance
    })

  }


  render(){
    const distanceAlert = this.state.distance > 0.5 ? "ITS HUGE : " : "ITS SMALL : ";
    return (
      <div className="App">
        {distanceAlert + this.state.distance}
      </div>
    );
  }
}

export default App;
