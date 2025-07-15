function Header({ className }) {
  return (
    <header
      className={`h-32 flex flex-row items-center bg-header-yellow shadow-hard shadow-header-shadow z-10 ${className}`}
    >
      <h1 className="font-bold text-2xl px-4">Pokedex</h1>
    </header>
  );
}

export default Header;
