import Card from './Card';

function Gameboard({ cards, onCardClick }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 p-4 md:p-6 max-w-7xl mx-auto">
      {cards.map((card) => (
        <Card 
          key={card.id} 
          card={card} 
          onCardClick={onCardClick} 
        />
      ))}
    </div>
  );
}
export default Gameboard;