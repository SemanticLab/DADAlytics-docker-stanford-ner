FROM openjdk:8-jre

RUN curl -sL https://deb.nodesource.com/setup_6.x | bash - && apt-get install -y nodejs
ADD lib/stanford-ner.jar lib/english.all.3class.distsim.crf.ser.gz lib/english.conll.4class.distsim.crf.ser.gz lib/english.muc.7class.distsim.crf.ser.gz index.js package.json start.sh ./
RUN npm install forever -g && npm install
EXPOSE 9000
CMD ["/bin/bash", "start.sh"]