import Logo from '@/assets/tbtLogo.png';
import { Link } from 'react-router-dom';

const BrandLogo = ({ className }: { className?: string }) => {
  return (
    <Link to='/' className={className}>
      <figure>
        {' '}
        <img src={Logo} alt='Local venda Logo' />
      </figure>
    </Link>
  );
};

export default BrandLogo;
