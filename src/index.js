import React from 'react';
import ReactDOM from 'react-dom';

import {
  FlexBox,
  Heading,
  SpectacleLogo,
  UnorderedList,
  CodeSpan,
  OrderedList,
  ListItem,
  FullScreen,
  Progress,
  Appear,
  Stepper,
  Slide,
  Deck,
  Text,
  Grid,
  Box,
  Image,
  CodePane,
  MarkdownSlide,
  MarkdownSlideSet,
  Notes,
  Link
} from 'spectacle';

import img from '../images/connectivity.png';
import schema from '../images/schema.png';
import cacheFirst from '../images/cache-first.png';

import schemaStep1 from '../images/sw-schema-1.png';
import schemaStep2 from '../images/sw-schema-2.png';
import schemaStep3 from '../images/sw-schema-3.png';

import workboxLogo from '../images/workbox-logo.jpg';

import devtools from '../images/devtools.png';


import scope from '../images/scope.png';
import scopeOk from '../images/scope-ok.png';

import serviceWorkerSchema from '../images/service-worker-schema.png';
import workboxLogs from '../images/workbox-logs.avif'

import fitstInstall from "../video/sw-firstinstall.mp4"
import secondInstall from "../video/sw-second-install.mp4"

import uncleBen from '../images/uncleben.webp'

const formidableLogo =
  'https://avatars2.githubusercontent.com/u/5078602?s=280&v=4';

// SPECTACLE_CLI_THEME_START
const theme = {
  fonts: {
    header: '"Open Sans Condensed", Helvetica, Arial, sans-serif',
    text: '"Open Sans Condensed", Helvetica, Arial, sans-serif'
  }
};
// SPECTACLE_CLI_THEME_END

// SPECTACLE_CLI_TEMPLATE_START
const template = () => (
  <FlexBox
    justifyContent="space-between"
    position="absolute"
    bottom={0}
    width={1}
  >
    <Box padding="0 1em">
      <FullScreen />
    </Box>
    <Box padding="1em">
      <Progress />
    </Box>
  </FlexBox>
);
// SPECTACLE_CLI_TEMPLATE_END

console.log(img);

const Presentation = () => (
  <Deck theme={theme} template={template}>
    <Slide      
      backgroundImage={`url(${img})`}

      >
    <Heading       backgroundOpacity={0.5}  backgroundImage={img} padding="0px" margin="0px" fontSize="h3">
      Du web sans internet, c’est possible !
    </Heading>
    </Slide>
    <Slide>
      <FlexBox height="100%" flexDirection="column">
        <Heading margin="0px" fontSize="h2">
          Loïc BOURG
        </Heading>
        <Heading margin="0px" fontSize="h2" >
          Développeur ITNetwork
        </Heading>
      </FlexBox>
    </Slide>
    <Slide
      backgroundColor="tertiary"
       backgroundOpacity={0.5}
    >
      <Heading>Workers ?</Heading>
      <UnorderedList>
        <Appear>
          <ListItem>Possibilité d'exécuter du javascript en dehors du thread principal</ListItem>
        </Appear>
        <Appear>
          <ListItem>Mais pas d'accés au DOM !</ListItem>
        </Appear>
      </UnorderedList>
    </Slide>
    <Slide>
      <Heading>Service worker</Heading>
      <UnorderedList>
      <Appear>
        <ListItem>Ajouté en 2015</ListItem>
      </Appear>
      <Appear>
        <ListItem>Donne la possibilité d'intercepter des requétes provenant de la page courante</ListItem>
      </Appear>
      <Appear>
        <ListItem>Un des aspects des progressive web app (gestion du hors ligne)</ListItem>
        </Appear>
      </UnorderedList>
    </Slide>

    <Slide>
      <FlexBox height="100%" alignItems="center" justifyContent="center">
                <Image src={serviceWorkerSchema} />
      </FlexBox>
    </Slide>

    <Slide>
    <FlexBox flexDirection="column">
        <Heading margin="0px">
           Subtilités      
        </Heading>
      </FlexBox>
      <Heading></Heading>
    </Slide>
    <Slide>
      <Heading mb="1em" >Scope</Heading>
      <FlexBox mb="1em" >
        <Image alignItems="center" maxWidth="400px" src={scope} /><Appear><Text>❌</Text></Appear>
      </FlexBox>
      <Appear>
      <FlexBox>
        <Image alignItems="center" maxWidth="400px" src={scopeOk} /><Text>✔️</Text>
      </FlexBox>
      </Appear>
    </Slide>
    <Slide>
      <Heading>Environnement sécurisé</Heading>
      <UnorderedList>
        <ListItem>
          HTTPS
        </ListItem>
        <Appear>
        <ListItem>
          Localhost
        </ListItem>
        </Appear>
        <Appear>
        <ListItem>
          chrome://flags/#unsafely-treat-insecure-origin-as-secure
        </ListItem>
        </Appear>
      </UnorderedList>

    </Slide>
    <Slide>
    <Heading>Cycle de vie</Heading>
      <UnorderedList>
        <ListItem>
          Installation
        </ListItem>
        <Appear>
        <ListItem>
          Attente
        </ListItem>
        </Appear>
        <Appear>
        <ListItem>
          Activation
        </ListItem>
        </Appear>
      </UnorderedList>
    </Slide>

    <Slide>
      <video controls muted=""><source src={fitstInstall} type="video/mp4"/></video>
      <Notes>
      bien indiquer que c'est fonctionel au rechargement (sauf client claim)
      </Notes>
    </Slide>

    <Slide>
      <video controls loop muted=""><source src={secondInstall} type="video/mp4"/></video>
      <Notes>
      NOTE: bien indiquer que c'est fonctionel lorsque plus aucun onglet du navigateur n'est sur le site (sauf skeep waiting)

      </Notes>
    </Slide>

    <Slide>
      <FlexBox  mb="1em" >
    <CodePane language="javascript">
      {`     
// main.js
 const registration = await navigator.serviceWorker.register("/sw.js", {
  scope: "/",
});
      `}
    </CodePane>
    </FlexBox>

<Appear>
    <CodePane language="javascript">
      {`
// sw.js      
self.addEventListener("fetch", (evt) => {
  evt
    .respondWith(new Response(
      "<p>Coucou !</p>",
      {
        headers: { "Content-Type": "text/html" },
      }
    ))
});
      `}
    </CodePane>
    </Appear>
    </Slide>

<Slide>
<CodePane language="javascript">
      {`
// sw.js

this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/index.html',
        '/index.js'
      ]);
    })
  );
});


self.addEventListener("fetch", (evt) => {
  evt
    .respondWith(
      caches.match(event.request)
    )
});
      `}
</CodePane>
</Slide>

<Slide>
      <Image src={cacheFirst} />
    </Slide>

<Slide>

<CodePane language="javascript">
      {`
// sw.js

this.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).catch(function() {
      return fetch(event.request).then(function(response) {
        return caches.open('v1').then(function(cache) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});

      `}
</CodePane>

</Slide>

    <Slide>
    <FlexBox height="100%" alignItems="center" justifyContent="center">
                <Image src={workboxLogo} />
      </FlexBox>
    </Slide>

    <Slide>
    <CodePane language="javascript" >
      {`
import {registerRoute} from 'workbox-routing';
import {CacheFirst} from 'workbox-strategies';

registerRoute(
  ({url}) => url.pathname.startsWith('/assets'),
  new CacheFirst()
);  
      `}
    </CodePane>
    </Slide>
    <Slide>
    <CodePane language="javascript" >
      {`
import {setDefaultHandler, setCatchHandler} from 'workbox-routing';

precacheAndRoute([{ url: '/offline', revision: 'mybuildid' }]);

setCatchHandler(event => {
  if (event.request.destination === 'document') {
    return workbox.precaching.matchPrecache('/offline');
  }
 });
      `}
    </CodePane>
    </Slide>

 <Slide>
    <UnorderedList>
        <Image src={workboxLogs} />
    </UnorderedList>
</Slide>

    <Slide>
        <Image height="80%" src={devtools} />
    </Slide>

    <Slide>
      <Heading>Dangers</Heading>
      <UnorderedList>
          <ListItem>Attention au cache first</ListItem>
          <Appear><ListItem>Attention aux traitements trop long</ListItem></Appear>
          <Appear><ListItem>Precache trop important</ListItem></Appear>
      </UnorderedList>
    </Slide>

    <Slide  backgroundImage={`url(${uncleBen})`} >
      <Appear><Heading>Merci !</Heading></Appear>
    </Slide>

    <Slide>
      <Heading>Pour aller plus loin</Heading>
      <UnorderedList>
        <ListItem>
          <Link href="https://developer.chrome.com/docs/workbox/" >https://developer.chrome.com/docs/workbox/</Link>
        </ListItem>
        <ListItem>
          <Link href="https://blog.itnetwork.fr/blog-post/2022/01/17/application-web-hors-ligne.html" >https://blog.itnetwork.fr/blog-post/2022/01/17/application-web-hors-ligne.html</Link>
        </ListItem  >
        <ListItem>
        <Link href="https://developer.mozilla.org/fr/docs/Web/API/Service_Worker_API/Using_Service_Workers" >https://developer.mozilla.org/fr/docs/Web/API/Service_Worker_API/Using_Service_Workers</Link>
        </ListItem>
        <ListItem>
        <Link href="https://web.dev/learn/pwa/service-workers/" >https://web.dev/learn/pwa/service-workers/</Link>
        </ListItem>
        </UnorderedList>
    </Slide>
  </Deck>
);

ReactDOM.render(<Presentation />, document.getElementById('root'));
