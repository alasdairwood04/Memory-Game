import { useState } from 'react'
import { useEffect } from 'react'
import ScoreBoard from './components/Scoreboard';
import Card from './components/Card';
import Gameboard from './components/Gameboard';

function App() {
  const [cards, setCards] = useState([]) // Initialize with an empty array
  const [currentScore, setCurrentScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [loading, setLoading] = useState(false)
  const [shouldShuffle, setShouldShuffle] = useState(false);


  useEffect(() => {
    const fetchAndFormatData = async () => {
      setLoading(true)
      try {
        // fetch the initial list of 12 pokemon
        const listResponse = await fetch('https://pokeapi.co/api/v2/pokemon?limit=12')
        const listData = await listResponse.json()
        const pokemonList = listData.results;
        console.log(pokemonList)

        // fetch the detailed data for each pokemon in parallel
        const pokemonDetails = await Promise.all(
          pokemonList.map(async (pokemon) => {
            const detailResponse = await fetch(pokemon.url);
            return await detailResponse.json();
          })
        );

        // format detailed data into card structure
        const formattedCards = pokemonDetails.map((pokemon) => ({
          id: pokemon.id, 
          name: pokemon.name,
          image: pokemon.sprites.other["official-artwork"].front_default,
          clicked: false,
        }));
        setCards(formattedCards)

        console.log(formattedCards)
      } catch (error) {
        console.error('Error fetching Pokémon data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAndFormatData()
  }, [])

  const shuffleCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5) 
    setCards(shuffled)
  }

  useEffect(() => {
  if (shouldShuffle) {
    const timer = setTimeout(() => {
      shuffleCards();
      setShouldShuffle(false);
    }, 250);
    return () => clearTimeout(timer);
    }
  }, [cards, shouldShuffle]);




  const handleCardClick = (clickedCardId) => {
    const clickedCard = cards.find(card => card.id === clickedCardId);

    // Game Loss Condition
    if (clickedCard.clicked) {
      if (currentScore > bestScore) {
        setBestScore(currentScore);
      }
      setCurrentScore(0);
      setCards(cards.map(card => ({ ...card, clicked: false })));
      // You can add a user message here (e.g., using a state for game status)
      alert("Game Over! You clicked the same Pokémon twice.");
    } 
    // Correct Guess
    else {
      const newScore = currentScore + 1;
      setCurrentScore(newScore);

      setCards(
        cards.map(card => 
          card.id === clickedCardId ? { ...card, clicked: true } : card
        )
      );

      // Game Win Condition
      if (newScore === cards.length) {
        setBestScore(newScore);
        setCurrentScore(0);
        setCards(cards.map(card => ({ ...card, clicked: false })));
        // You can add a user message here
        alert("Congratulations! You found them all!");
      }
    }

    setShouldShuffle(true);
  };


  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-800 p-4">
      <header className="">
        <h1 className="text-3xl text-gray-200 font-bold text-center">Pokémon Memory Game</h1>
        <ScoreBoard currentScore={currentScore} bestScore={bestScore} />
        <p className="text-gray-400 text-center">Get points by clicking on an image but don't click on the same image twice!</p>
      </header>
      <main>
        {loading ? (
          <p className="loading-message">Loading Pokémon...</p>
        ) : (
          <Gameboard cards={cards} onCardClick={handleCardClick} />
        )}
      </main>
    </div>
)

}

export default App
