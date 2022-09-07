const Footer = () => {
  const date = new Date();

  return (
    <footer className="w-full h-10vh flex justify-center items-center text-white">
      <p>FEESE {date.getFullYear()} &copy; Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;
