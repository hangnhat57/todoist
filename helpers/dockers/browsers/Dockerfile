#FROM atlassianlabs/docker-node-jdk-chrome-firefox
#RUN npm install -g webdriver-manager
#RUN webdriver-manager update
#EXPOSE 4444
#CMD webdriver-manager start
FROM openjdk:11.0.3-jdk-stretch

RUN apt-get update && apt-get install -y curl build-essential git software-properties-common wget

#RUN curl -sL https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
#    echo "deb https://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list && \
#    curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
ARG CHROME_VERSION="google-chrome-stable"
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
  && apt-get update -qqy \
  && apt-get -qqy install \
  ${CHROME_VERSION:-google-chrome-stable} \
  && rm /etc/apt/sources.list.d/google-chrome.list \
  && rm -rf /var/lib/apt/lists/* /var/cache/apt/*
# RUN apt-get update && \
#   apt-get install -y --no-install-recommends locales && \
#   locale-gen en_US.UTF-8 && \
#   apt-get dist-upgrade -y && \
#   apt-get --purge remove openjdk* && \
#   echo "oracle-java8-installer shared/accepted-oracle-license-v1-1 select true" | debconf-set-selections && \
#   echo "deb http://ppa.launchpad.net/webupd8team/java/ubuntu xenial main" > /etc/apt/sources.list.d/webupd8team-java-trusty.list && \
#   apt-key adv --keyserver keyserver.ubuntu.com --recv-keys EEA14886 && \
#   apt-get update && \
#   apt-get install -y --no-install-recommends oracle-java8-installer oracle-java8-set-default && \
#   apt-get clean all

RUN apt-get install -y nodejs firefox google-chrome-stable && \
  mkdir /tests && \
  npm i -g webdriver-manager



RUN webdriver-manager update --versions.chrome=2.46

EXPOSE 4444
RUN mkdir /test
WORKDIR /test

CMD webdriver-manager start