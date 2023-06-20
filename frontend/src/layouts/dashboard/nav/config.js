// component
import SvgColor from '../../../components/svg-color';
import Cat from "../../../assests/icons/categorization.png"
// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_dashboard'),
    dropdown: true
  },
 
  {
    title: 'vehicle categories',
    path: 'cat',
    icon: icon('ic_dashboard'),
    dropdown: true
  },
  {
    title: 'vehicles',
    path: 'vehicles',
    icon: icon('ic_vehicles'),
    dropdown: true
  },
 
];

export default navConfig;
