
var Pokemon = React.createClass({
  getTrack:function(){
    var that = this;
    $.getJSON('http://api.soundcloud.com/resolve?url=https://soundcloud.com/richard-hong-111605706/sets/pokemon&client_id=a5b75fc5d7251916a7c1e16fb662e932', function(data){
      _.each(data.tracks, function(track){
        var trackName = track.title.toLowerCase();
        var compareName = that.props.name;
        if (that.props.name === 'nidoran-f'){
          compareName = 'nidoran';
        } else if (that.props.name === 'nidoran-m'){
          compareName = 'nidoran';
        } else if (that.props.name === 'diglett'){
          compareName = 'diglett1';
        } else if (that.props.name === 'mankey'){
          compareName = 'mankey2';
        } else if (that.props.name === 'primeape'){
          compareName = 'primeape4';
        } else if (that.props.name === 'farfetchd'){
          compareName = "farfetch'd";
        } else if (that.props.name === 'vulpix'){
          compareName = 'vulpix!';
        } else if (that.props.name === 'mr-mime'){
          compareName = 'mr. mime';
        }
        if (trackName === compareName || trackName === ('0'+that.props.id+' - '+compareName) || trackName === (that.props.id+' - '+compareName)) {
          console.log(track);
          SC.oEmbed(track.uri, {maxheight:81, auto_play:true}, document.getElementById('player'));
        }
      }, this)
    })
  },
  render:function(){
    return (
          <div className="pokemon">
            <h3>{this.props.name}</h3>
            <img className="pic" src={this.props.img}/>
            <p>#{this.props.id}</p>
            <button className="battle" onClick={this.getTrack}>Battle Cry!</button>
          </div>
      )   
  }
});

var Pokedex = React.createClass({
  getInitialState: function(){
    this.loadThemeSong();
    var pokeList = [];
    return {
      pokeList:pokeList
    }
  },
  loadThemeSong:function(){
    var that = this;
    $.getJSON('http://api.soundcloud.com/resolve?url=https://soundcloud.com/richard-hong-111605706/sets/pokemon&client_id=a5b75fc5d7251916a7c1e16fb662e932', function(data){
      _.each(data.tracks, function(track){
        if (track.title.toLowerCase() === 'Pokemon Theme Song FULL'.toLowerCase()){
          SC.oEmbed(track.uri, {maxheight:81, auto_play:false}, document.getElementById('player'));
        }
      }, this);
    });
  },
  sortPokemon:function(){
    this.state.pokeList.sort(function(a,b){return a.id - b.id});
  },
  getPokemon:function(){
    var pokeList = [];
    var that = this
    var number = parseInt($('#select').val())
    for (var i = 1; i < number; i++){
      $.getJSON('http://pokeapi.co/api/v2/pokemon-form/'+i, function(pokemon){
        pokeList.push(pokemon);
        that.setState({pokeList:pokeList});
        that.sortPokemon();
      }, this);
    }
  },
  render:function(){
    return (
      <div>
        <div>
          <img id="logo" src="http://vignette3.wikia.nocookie.net/logopedia/images/e/e5/Pokemon_logo.png/revision/latest?cb=20120128115827" onClick={this.loadThemeSong}/>
          <select id="select">
            <option value="11">10</option>
            <option value="21">20</option>
            <option value="31">30</option>
            <option value="41">40</option>
            <option value="51">50</option>
            <option value="61">60</option>
            <option value="71">70</option>
            <option value="81">80</option>
            <option value="91">90</option>
            <option value="101">100</option>
            <option value="111">110</option>
            <option value="121">120</option>
            <option value="131">130</option>
            <option value="141">140</option>
            <option value="152">151</option>
          </select>
          <button id="get" onClick={this.getPokemon}>Get Pokemon!</button>
        </div>
        <div id="box">
          {this.state.pokeList.map(function(pokemon, i){
              return (
                <Pokemon
                  key={i}
                  img={pokemon.sprites.front_default} 
                  name={pokemon.name}
                  id={pokemon.id}>
                </Pokemon>
              )
          }, this)}
        </div>
      </div>
      )
  }
});


ReactDOM.render(<Pokedex/>, document.getElementById('container'));