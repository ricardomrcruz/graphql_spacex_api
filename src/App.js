import logo from './logo.svg';
import './App.css';
import {
  useQuery,
  gql,
} from "@apollo/client";

const GET_LAUNCHES = gql`
  query GetLaunches {
    launches(limit: 5) {
      launch_date_utc
      launch_success
      rocket {
        rocket_name
      }
      links {
        video_link
      }
      details
    }
  }
`;

function App() {


  const { loading, error, data } = useQuery(GET_LAUNCHES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( </p>;


  return (
    <div className="App">
    {data.launches.map((launch) => (
      <li key={launch.launch_date_utc}>
      <div>Date: {launch.launch_date_utc}</div>
      <div>Rocket Name: {launch.rocket.rocket_name}</div>
      <div>Launch Success: {launch.launch_success ? 'Yes' : 'No'}</div>
      <div>Video Link: <a href={launch.links.video_link} target="_blank" rel="noopener noreferrer">Watch Launch</a></div>
      <div>Details: {launch.details}</div>
    </li>
    ))}
  </div>
  );
}

export default App;
