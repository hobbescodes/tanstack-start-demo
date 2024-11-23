const Footer = () => {
  return (
    <footer className="flex flex-col items-center py-4 text-muted-foreground place-self-center">
      &copy; {new Date().getFullYear()} hobbescodes
    </footer>
  );
};

export default Footer;
