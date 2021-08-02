import React, { useEffect, useMemo, useState } from 'react';
import ReactGA from 'react-ga';
import ReactPlayer from 'react-player';
import { FaWindowClose } from 'react-icons/fa';
import { Player } from 'video-react';

import { Container, Ads } from './styles';

// 7days * 24 hours * 60 minutes * 60 seconds * 1000ms
const timeInterval = 7 * 24 * 60 * 60 * 1000;

const VodModal = ({ videoUrl, previewUrl }: any) => {
  const [showAd, setShowAd] = useState(false);
  useEffect(() => {
    const paymentTime = Number(localStorage.getItem('paymentTime'));

    if (Number(Date.now()) - paymentTime > timeInterval) {
      setShowAd(true);
    }
  }, [videoUrl]);

  const handleClick = () => {
    localStorage.setItem('paymentTime', Date.now().toString());
    setShowAd(false);
    ReactGA.event({
      category: 'AlreadyPaid',
      action: videoUrl.split('_')[1],
    });
  };

  const showCustomPlayer =
    /^iP/.test(navigator.platform) ||
    (/^Mac/.test(navigator.platform) && navigator.maxTouchPoints > 4);

  const renderVodModal = useMemo(() => {
    return (
      <>
        <Ads isVisible={showAd}>
          <div>
            <a
              href="https://ko-fi.com/pogulive"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hey, these servers aren't free...
              <img
                className="kofi-img"
                width="230px"
                src="https://cdn.ko-fi.com/cdn/kofi5.png?v=2"
                alt="Buy Me a Coffee at ko-fi.com"
              />
              <p>{`... if you can, of course :)`}</p>
            </a>
            <button onClick={handleClick}>
              I already paid
              <img
                title="EleGiggle"
                src="https://static-cdn.jtvnw.net/emoticons/v1/4339/3.0"
              />
            </button>
          </div>
          <button onClick={() => setShowAd(false)}>
            {window.innerWidth > 480 && 'Close Reminder'}
            <FaWindowClose size={32} />
          </button>
        </Ads>

        {showCustomPlayer ? (
          <>
            <Player
              playsInline
              poster={previewUrl}
              src={videoUrl.replace(process.env.NEXT_PUBLIC_CORS, '')}
            />
          </>
        ) : (
          <ReactPlayer
            url={videoUrl}
            controls
            width="100%"
            height="100%"
            config={{
              file: {
                hlsOptions: {
                  xhrSetup: (xhr: any, _url: string) => {
                    xhr.open(
                      'GET',
                      _url.replace('unmuted.ts', 'muted.ts'),
                      true,
                    );
                  },
                },
              },
            }}
          />
        )}
      </>
    );
  }, [videoUrl, showAd, setShowAd]);

  return <Container>{renderVodModal}</Container>;
};

export default VodModal;
