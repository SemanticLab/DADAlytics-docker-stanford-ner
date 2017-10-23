FROM openjdk:8-jre

RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y nodejs

ADD index.js .
ADD package.json .
ADD lib/stanford-ner-with-classifier.jar .
ADD lib/english.all.3class.distsim.crf.ser.gz .
ADD lib/english.conll.4class.distsim.crf.ser.gz .
ADD lib/english.muc.7class.distsim.crf.ser.gz .

RUN npm install
RUN npm install forever -g

ADD start.sh .

EXPOSE 8010

CMD ["/bin/bash", "start.sh"]