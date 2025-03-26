import { useState } from "react";
import { Alert, Button, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";

interface ICard {
  id: string;
  display: string;
  value: number;
  suit?: string
}

type IOperator = "+" | "-" | "*" | "/";

export default function Index() {
  const createDeck = () => {
    const suits = ["♠", "♥", "♦", "♣"];

    const values = [
      { display: "A", value: 1 },
      { display: "2", value: 2 },
      { display: "3", value: 3 },
      { display: "4", value: 4 },
      { display: "5", value: 5 },
      { display: "6", value: 6 },
      { display: "7", value: 7 },
      { display: "8", value: 8 },
      { display: "9", value: 9 },
      { display: "10", value: 10 },
      { display: "J", value: 10 },
      { display: "Q", value: 10 },
      { display: "K", value: 10 }
    ];

    let deck = [];
    for (let suit of suits) {
      for (let card of values) {
        const id = card.display + suit;
        deck.push({ ...card, suit, id });
      }
    }
    return deck;
  };

  const drawCards = (deck: any[]) => {
    let shuffled = [...deck].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 4);
  };

  const Operator: IOperator[] = ["+", "-", "*", "/"];

  const [deck] = useState<ICard[]>(createDeck());
  const [hand, setHand] = useState<ICard[]>(drawCards(deck));
  const [selectedCards, setSelectedCards] = useState<ICard[]>([]);
  const [results, setResults] = useState<any[]>([]);

  const selectCard = (card: ICard) => {
    if (selectedCards.includes(card)) {  // Deselect the card
      setSelectedCards(selectedCards.filter((c) => c.id !== card.id));
    } else if (selectedCards.length < 2) {  // Select the card
      setSelectedCards([...selectedCards, card]);
    }
  };

  const applyOperation = (operator: IOperator) => {
    if (selectedCards.length !== 2) return;
    const [card1, card2] = selectedCards;
    let newValue;
    switch (operator) {
      case "+":
        newValue = card1.value + card2.value;
        break;
      case "-":
        newValue = card1.value - card2.value;
        break;
      case "*":
        newValue = card1.value * card2.value;
        break;
      case "/": 
        newValue = card1.value / card2.value;
        break;
    }

    // Remove the selected cards
    const newHand = hand.filter((c: ICard) => c.id !== card1.id && c.id !== card2.id);

    // Add new card with the result
    newHand.push({ id: Math.random().toString(), display: `${newValue}`, value: newValue });
    setHand(newHand);
    
    // Add the result to the history and reset selected cards
    setResults([...results, `${card1.display} ${operator} ${card2.display} = ${newValue}`]);
    setSelectedCards([]);

    // Check if card total value are 24
    if (newHand.length === 1) {
      if (newHand[0].value === 24) {
        Alert.alert("You Win!", "You made 24!");
      } else {
        Alert.alert("Try Again", "The result is not 24.");
      }
    }
  }

  const restartGame = () => {
    setHand(drawCards(deck));
    setSelectedCards([]);
    setResults([]);
  };

  return (
    <View style={{ padding: 20, alignItems: "center" }}>
      <Text style={{ fontSize: 24 }}>24 Game</Text>

      {/* Hand Cards */}
      <View style={{ flexDirection: "row", marginVertical: 20 }}>
        <FlatList
          data={hand}
          renderItem={({ item: card }) => (<TouchableOpacity
            key={`${card.id}-${card.suit}`}
            onPress={() => selectCard(card)}
            style={{
              margin: 10,
              padding: 15,
              backgroundColor: selectedCards.includes(card) ? "lightblue" : "white",
              borderWidth: 1,
              borderRadius: 5,
              flex: 4,
              alignItems: "center"
            }}
          >
            <Text style={{ fontSize: 24 }}>{card.display} {card.suit}</Text>
          </TouchableOpacity>)}
          numColumns={2}
        />
      </View>

      {/* Operator Buttons */}
      {selectedCards.length === 2 && (
        <View style={{ flexDirection: "row", marginVertical: 20 }}>
          {Operator.map((op) => (
            <TouchableOpacity
              key={op}
              onPress={() => applyOperation(op)}
              style={{ margin: 10, padding: 15, backgroundColor: "gray", borderRadius: 5 }}
            >
              <Text style={{ fontSize: 24, color: "white" }}>{op}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Calculation History */}
      <View style={{ marginTop: 20 }}>
        {results.map((result, index) => (
          <Text key={index} style={{ fontSize: 18 }}>
            {result}
          </Text>
        ))}
      </View>

      {/* Restart Button */}
      <View style={{ marginTop: 30 }}>
        <Button title="Restart Game" onPress={restartGame} color="red" />
      </View>

    </View>
  );
}
