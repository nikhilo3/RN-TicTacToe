import {
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState} from 'react';
import Box from './components/Box';

const App = () => {
  const [trunO, setTurnO] = useState(true);

  const [box, setBox] = useState(Array(9).fill(''));

  const [winner, setWinner] = useState(false);
  const [draw, setDraw] = useState(false);

  const winPattens = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = () => {
    for(let pattern of winPattens){
      let pos1 = box[pattern[0]];
      let pos2 = box[pattern[1]];
      let pos3 = box[pattern[2]];

      if(pos1 !== "" && pos1 === pos2 && pos2 === pos3){
        setWinner(pos1);
      }
      
    }
  };

  const checkDraw = () => {
    let isdraw = true;

    box.forEach((item)=>{
      if(item === ""){
        isdraw = false;
      }
    })

    if(isdraw){
      setDraw(true);
    }
  }

  const handlePress = (index: number) => {
    if (box[index]) {
      return;
    }
    // const newBox = box.slice();
    // newBox[index] = trunO ? 'O' :'X';
    // setBox(newBox);

    box[index] = trunO ? 'O' : 'X';
    setBox(box);
    console.log(box);
    setTurnO(!trunO);
  };
  return (
    <>
      <StatusBar backgroundColor="black" />
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.headingcontainer}>
            <Text style={[styles.text]}>
              {winner ? `winner is ${winner}` : draw ? `match is Draw` : trunO ? "Player O's Turn" : "Player X's Turn"}
            </Text>
          </View>
          <View style={styles.boxcontainer}>
            {box.map((item, index) => (
              <Pressable
              disabled={!!winner}
                key={index}
                style={styles.inner}
                onPress={() => {handlePress(index); checkWinner(); checkDraw();}}>
                <Box item={item} />
              </Pressable>
            ))}
          </View>
          <Pressable
            style={[styles.headingcontainer, {backgroundColor: '#D10363'}]}
            onPress={() => {
              setBox(Array(9).fill(''));
              setWinner(false);
              setDraw(false);
            }}>
            <Text style={styles.text}>Reload Game</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
  },
  headingcontainer: {
    marginVertical: 20,
    backgroundColor: '#FF9A00',
    paddingVertical: 15,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    borderRadius: 8,
  },
  inner: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '33.33%',
    borderWidth: 2,
    borderColor: '#3A506B',
    backgroundColor: '#1D2732',
    shadowColor: 'rgba(210, 197, 197, 1)',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 4,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
