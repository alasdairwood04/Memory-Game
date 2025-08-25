function Card({ card, onCardClick }) {
  return (
    <div 
      onClick={() => onCardClick(card.id)}
      className="bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
    >
      <div className="p-4 flex flex-col items-center">
        <div className="bg-gray-600/30 rounded-full p-4 mb-3 w-auto h-48 flex items-center justify-center">
          <img 
            src={card.image} 
            alt={card.name}
            className="w-auto h-28 object-contain hover:animate-pulse" 
          />
        </div>
        <p className="text-center text-gray-200 font-medium capitalize mt-1 text-lg">
          {card.name}
        </p>
      </div>
    </div>
  );
}

export default Card;