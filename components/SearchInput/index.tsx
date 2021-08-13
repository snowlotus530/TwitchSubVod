import React, { useEffect, useRef, useState } from 'react';
import ReactGA from 'react-ga';
import { FiSearch } from 'react-icons/fi';
import api from '@/utils/services/api';
import apiV2 from '@/utils/services/apiV2';
import { useGlobal } from '@/stores/GlobalContext';
import { Container } from './styles';
import QualitySelection from '../QualitySelection';
import ErrorModal from '../ErrorModal';
import LoadingModal from '../LoadingModal';

interface AutoCompleteProps {
  display_name: string;
}

interface Props {
  withQuality?: boolean;
}

const SearchInput = ({ withQuality }: Props) => {
  const inputRef = useRef<any>();
  const {
    setVideoQuality,
    error,
    setError,
    loading,
    setLoading,
    setVodUrl,
  } = useGlobal();
  const [username, setUsername] = useState('');
  const [autoComplete, setAutoComplete] = useState<Array<AutoCompleteProps>>(
    [],
  );

  useEffect(() => {
    !!username.length &&
      apiV2
        .get(`search/channels?query=${username}&first=3`)
        .then((response) => {
          setAutoComplete(response.data.data);
        })
        .catch((err) => {
          console.warn(err);
        });
  }, [username]);

  const handleSubmit = () => {
    if (username) {
      setLoading(true);
      try {
        setError('');
        api
          .get(`users?login=${username}`)
          .then((response) => {
            try {
              api
                .get(`channels/${response.data.users[0]._id}/videos?limit=1`)
                .then((channelResponse: any) => {
                  if (channelResponse.data.videos.length !== 0) {
                    location.href = `/videos/${username}`;
                  }
                  if (channelResponse.data._total === 0) {
                    setError(`${username} does not have any available streams`);
                  }
                });

              ReactGA.event({
                category: 'SearchedUserForDeletedVod',
                action: `${username}`,
              });
            } catch (err) {
              setLoading(false);
              setError('This user does not exist or is unavailable');
            }
          })
          .catch((err) => {
            setError(err.response?.data?.message);
            setLoading(false);
          });
      } catch (err) {
        console.warn(err);
        setLoading(false);
        setError('Something went wrong');
      }
    } else {
      setError('Enter a streamer username');
    }
  };

  const isDisabled = username.length <= 0;

  const handleQuality = (event: any) => {
    setVideoQuality(event.target.value);
    setVodUrl('');
  };

  return (
    <Container
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
      disabled={isDisabled}
    >
      <input
        ref={inputRef}
        type="text"
        name="username"
        aria-label="username"
        onChange={(event) => setUsername(event.target.value)}
        value={username}
        placeholder="Streamer Username"
        list="streamer-username"
        autoComplete="off"
      />

      <datalist id="streamer-username">
        {!!username &&
          !!autoComplete.length &&
          autoComplete.map((user: { display_name: string }) => (
            <option key={user.display_name} value={user.display_name} />
          ))}
      </datalist>
      {withQuality && (
        <QualitySelection onChange={(event: any) => handleQuality(event)} />
      )}
      <button type="submit" aria-label="submit" disabled={isDisabled}>
        <FiSearch size={14} />
        Search
      </button>
      {loading && <LoadingModal />}
      {error && <ErrorModal message={error} />}
    </Container>
  );
};

export default SearchInput;
