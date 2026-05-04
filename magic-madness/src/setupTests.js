import '@testing-library/jest-dom';

// Mock Firebase
jest.mock('./utils/firebase', () => ({
  auth: {
    onAuthStateChanged: jest.fn(),
  },
  db: {},
}));

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));