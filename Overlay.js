import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';

export default class Overlay extends React.Component {
    static defaultProps = {
        shapes : []
    }

    landmarkNames = [
        "leftEarPosition",
        "rightEarPosition",
        "leftEyePosition",
        "rightEyePosition",
        "leftCheekPosition",
        "rightCheekPosition",
        "mouthPosition",
        "leftMouthPosition",
        "rightMouthPosition",
        "noseBasePosition" 
    ];    

    constructor(props){
        super(props);

        this._getDots = this._getDots.bind(this);
        this._getFaceOverlays = this._getFaceOverlays.bind(this);
    }

    _getFaceOverlays() {
        let graphics = this.props.shapes.map((face, index) => {
            
            let dots = this._getDots(face);
            return (
            <Svg key={"svg"+index} height={face.bounds.size.height*2} width={face.bounds.size.width*2}>
                <Rect x={face.bounds.origin.x} y={face.bounds.origin.y} 
                    width={face.bounds.size.width} height={face.bounds.size.height}
                    fill="none" stroke="green" strokeWidth={2} />
                {dots}
            </Svg>);
        });

        return (graphics);
    }

    _getDots(face) {
        return this.landmarkNames.map((landmark, index) => {
            if(landmark in face) {
               return(
                <Circle key={"circle"+index} cx={face[landmark].x} 
                    cy={face[landmark].y} r={2} fill="red"/>
               );
            }
        });
    }

    render() {
        let faces = this._getFaceOverlays();
        return(
        <View style={{flex:1, position:"absolute",
            backgroundColor: 'transparent'}}>
            {faces.map(f=>f)}
        </View>
        );
    }
}