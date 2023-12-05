import { ToastService } from '../services/ToastService';

const Homepage = () => (
  <div>
    <h1>This is the Home Page</h1>
    <button
      onClick={() => {
        ToastService.createToast({ title: 'homepage toast' });
      }}
    >
      Generate Toast
    </button>
  </div>
);

export default Homepage;
