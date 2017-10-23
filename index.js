// index.js
var express = require('express');
var bodyParser = require('body-parser');
const ner = require('ner');

var app = express();
app.use(bodyParser.json({limit: '50mb'}));

var port = process.argv[2] || 9000;

var server = app.listen(port, function () {
		var host = server.address().address;
		var port = server.address().port;
		console.log('Processor listening at http://%s:%s', host, port);

});

app.get('/', function (req, res) {
		res.send(`Example CURL request: <br/><code>curl -XPOST -H "Content-type: application/json" -d "{\\"text\\":\\"Dada (/ˈdɑːdɑː/) or Dadaism was an art movement of the European avant-garde in the early 20th century, with early centers in Zürich, Switzerland at the Cabaret Voltaire (circa 1916); New York Dada began circa 1915,[1] and after 1920 Dada flourished in Paris. Developed in reaction to World War I, the Dada movement consisted of artists who rejected the logic, reason, and aestheticism of modern capitalist society, instead expressing nonsense, irrationality, and anti-bourgeois protest in their works.[2][3][4] The art of the movement spanned visual, literary, and sound media, including collage, sound poetry, cut-up writing, and sculpture. Dadaist artists expressed their discontent with violence, war, and nationalism, and maintained political affinities with the radical left.[5] Cover of the first edition of the publication Dada by Tristan Tzara; Zürich, 1917 There is no consensus on the origin of the movement's name; a common story is that the Austrian artist Richard Huelsenbeck plunged a knife at random into a dictionary, where it landed on dada, a colloquial French term for a hobby horse. Others note that it suggests the first words of a child, evoking a childishness and absurdity that appealed to the group. Still others speculate that the word might have been chosen to evoke a similar meaning (or no meaning at all) in any language, reflecting the movement's internationalism.[6] The roots of Dada lay in pre-war avant-garde. The term anti-art, a precursor to Dada, was coined by Marcel Duchamp around 1913 to characterize works which challenge accepted definitions of art.[7] Cubism and the development of collage and abstract art would inform the movement's detachment from the constraints of reality and convention. The work of French poets, Italian Futurists and the German Expressionists would influence Dada's rejection of the tight correlation between words and meaning.[8][9] Works such as Ubu Roi (1896) by Alfred Jarry, and the ballet Parade (1916–17) by Erik Satie would also be characterized as proto-Dadaist works.[10] The Dada movement's principles were first collected in Hugo Ball's Dada Manifesto in 1916. The Dadaist movement included public gatherings, demonstrations, and publication of art/literary journals; passionate coverage of art, politics, and culture were topics often discussed in a variety of media. Key figures in the movement included Hugo Ball, Marcel Duchamp, Emmy Hennings, Hans Arp, Raoul Hausmann, Hannah Höch, Johannes Baader, Tristan Tzara, Francis Picabia, Huelsenbeck, George Grosz, John Heartfield, Man Ray, Beatrice Wood, Kurt Schwitters, Hans Richter, and Max Ernst, among others. The movement influenced later styles like the avant-garde and downtown music movements, and groups including surrealism, nouveau réalisme, pop art and Fluxus.\\"}" 'http://localhost:9000/'</code><br/><br/>Results:<br/><code>{"LOCATION":["Zürich","Switzerland","New York Dada","Paris","Hugo Ball","Dada Manifesto","Hugo Ball"],"ORGANIZATION":["Tristan Tzara","Ubu Roi","Tristan Tzara"],"DATE":["20th century","1916","1915","1920","1917","1913","1916","1916"],"MONEY":[],"PERSON":["Zürich","Richard Huelsenbeck","Marcel Duchamp","Dada","Alfred Jarry","Erik Satie","Dada","Marcel Duchamp","Emmy Hennings","Hans Arp","Raoul Hausmann","Hannah Höch","Johannes Baader","Francis Picabia","Huelsenbeck","George Grosz","John Heartfield","Man Ray","Beatrice Wood","Kurt Schwitters","Hans Richter","Max Ernst"],"PERCENT":[],"TIME":[]}</code>`);
});

app.post('/', function(req, res) {
		var parsed = '';
		var nerPort = 8000;
		var text = req.body.text.replace(/\n+/gm, function myFunc(x){return' ';});

		ner.get({
			port:8000,
			host:'localhost'
		}, text, function(err, nerRes){
			if (err){
				res.status(500).json(err);
				return false;
			}
			res.status(200).json(nerRes.entities);
		});

});
