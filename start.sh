echo "Starting Stanford NER"
java -mx1000m -cp stanford-ner.jar edu.stanford.nlp.ie.NERServer -loadClassifier english.muc.7class.distsim.crf.ser.gz -port 8000 -outputFormat inlineXML &
echo "Starting REST server"
forever index.js