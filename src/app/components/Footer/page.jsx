export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full py-4 flex justify-center text-xs text-black bg-transparent z-30">
      © Scout Studios 2025
    </footer>
  )
  
 //Get date real-time
  const year = new Date().getFullYear();

  return (
    <footer className="fixed bottom-0 left-0 w-full py-4 flex justify-center text-xs text-black bg-transparent z-30">
      © Scout Studios {year}
    </footer>
  );
}