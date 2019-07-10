
<template>
	<div id="app" :style="{'background-color':color}">
		<section class="app-page">
				<div class="container">
					<div class="panel">
						
						<div class="columns is-multiline">
							<div class="column is-12">
								<ColorPicker v-model="color" :width="300" :height="300" :disabled="false"></ColorPicker>
							</div>

							<div class="column is-4 is-offset-4 has-text-centered">
								<h2 class="title">Color 2 Code</h2>
								<input type="text" v-model="color" class="input is-medium color-input" placeholder="#000000">
								<p class="help">you can enter hex values or rgb/rgba values 0-255</p>
							</div>

						</div>
						
						<div class="columns is-multiline">
							<div class="column is-12">
								<div class="field code-field" v-for="(item, title) in codes" :key="item.title">
										<label class="label">{{title}}</label>
										<div class="control" v-for="(code, j) in item.code" :key="j">
<pre v-highlightjs><code :class="item.lang">{{code}}</code></pre>
											<span class="copy-code" href="copy" @click="copy(code, $event)">copy</span>
										</div>
								</div>
							</div>
						</div>

					</div>
				</div>
		</section>
		<section>
			<div class="footer">
				<div class="container">
					<div class="has-text-centered">
						made with ❤️️ by <a href="https://www.vanderlin.cc">@vanderlin</a>
						<br>
						<br>
						<a href="https://github.com/vanderlin/color2code">
							<i class="fab fa-github"></i>
						</a>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import _ from 'lodash'; 
import tinycolor from 'tinycolor2'; 
import ColorPicker from 'vue-color-picker-wheel';
let copyPhrases = [
	'Code is copied!',
	'Copied!',
	'👩‍💻 copied!',
	'👨‍💻 Got it!',
	'Yeah! Copied!',
	'Booom!',
	'🐙 Copied'
];
export default {
	name: 'App',
	props: {},
	mixins: [],
	data() {
		return {
			color: null
		}
	},

	components: {
		ColorPicker,
	},

	methods: {
		randomColor() {
			return tinycolor({r:_.random(255), g:_.random(255), b:_.random(255)});
		},
		parseColor() {
			/*var data = $("#color-input").val();
			console.log("reading: "+data);
			var out  = "";
			var color;
			var alpha = 255.0;
			
			if(data.substring(0, 2) == "0x") {
				var d  = data.substring(2);
				var o  = "#";
				if(d.length <= 6) {
					for(var i=0; i<6; i++) {
						if(d[i] == undefined) o += "0";
						else o += d[i];
					}
				}
				var c = new RGBColor(o);
				data = c.toHex();
				console.log(d+" 0x Cleaned:"+o);
			}
			else if(data.search(",")>0) {
				var c = data.split(',');
				var hasNormals = true;
				for(var i=0; i<c.length; i++) {
					if(c[i] > 1.0) hasNormals = false;
				}
				console.log(hasNormals);
				if(hasNormals == true) {
					for(var i=0; i<c.length; i++) {
						if(c[i] <= 1.0) c[i] *= 255.0;
					}
				}
				else {
					for(var i=0; i<c.length; i++) {
						c[i] = Math.round(c[i]);
					}
				}
				
				var s = 'rgb(';
				if(c.length>=1) s += c[0]+','; 
				if(c.length>=2) s += c[1]+','; 
				if(c.length>=3) s += c[2]; 
				if(c.length>=4) alpha = c[3]; 
				s+=')';
				var cc = new RGBColor(s);
				data = cc.toHex();
				console.log(s);
				
			}
			if(data.search(",")<0 && data.substring(0, 1) != "#") {
				console.log("HEX missing #");
				data = "#"+data;
			}
			if(data.substring(0, 1) == "#") {
				data = cleanUpColor(data);
				console.log("#hex input: "+data);
			}*/
		},
		copy(code, $event) {
			//  $event.target.select();

			this.$copyText(code).then((e) => {
				let toast = this.$toasted.show(_.sample(copyPhrases)).goAway(1500);
			}, (e) => {
				console.log(e)
			})

			
		}
	},

	computed: {
		codes() {

			let round = 1;
			
			let color = tinycolor(this.color);
			
			let rgb = color.toRgb();
			
			let r = (rgb.r).toFixed(round);
			let g = (rgb.g).toFixed(round);
			let b = (rgb.b).toFixed(round);
			let a = (rgb.a * 255).toFixed(round);

			let rf = (rgb.r / 255.0).toFixed(round);
			let gf = (rgb.g / 255.0).toFixed(round);
			let bf = (rgb.b / 255.0).toFixed(round);
			let af= (rgb.a).toFixed(round);

			return {
				'HTML/CSS': {
					lang: 'css',
					code: [
						color.toHexString(),
						color.toRgbString()+';',
						`background-color: ${color.toString()}`,
						`background: ${color.toString()}`,
						`color: ${color.toString()}`
					]
				},
				'iOS': {
					lang: 'c++',
					code: [`UIColor * color = [UIColor colorWithRed:${rf} green:${gf} blue:${bf} alpha:${af}];`]
				},
				'Objective C': {
					lang: 'Objective-C',
					code: [`NSColor * color = [NSColor colorWithDeviceRed:${rf} green:${gf} blue:${bf} alpha:${af}];`]
				},
				'OpenFrameworks': {
					lang: 'c++',
					code: [
						`ofColor color = ofColor(${r}, ${g}, ${b}, ${a});`,
						`ofFloatColor color = ofFloatColor(${rf}, ${gf}, ${bf}, ${af});`,
						`ofSetColor(${r}, ${g}, ${b}, ${a});`,
					]
				},
				'Cinder': {
					lang: 'c++',
					code: [
						`ci::ColorA color(CM_RGB, ${r}, ${g}, ${b}, ${a});`,
					]
				},
				'Processing': {
					lang: 'java',
					code: [
						`Color color = new Color(${r}, ${g}, ${b}, ${a});`,
					]
				},
				'C/C++': {
					lang: 'c++',
					code: [
						`float color[4] = {${rf}, ${gf}, ${bf}, ${af}};`,
						`int color[4] = {${r}, ${g}, ${b}, ${a}};`,
					]
				},
				'OpenGL': {
					lang: 'c++',
					code: [
						`glColor3f(${rf}, ${gf}, ${bf}};`,
						`glColor4f(${rf}, ${gf}, ${bf}, ${af}};`,
					]
				}
	

			}
		}
	},

	watch: {

	},

	created() {
		this.color = this.randomColor().toHexString();
		
		
	},

	destroyed() {
	},

	mounted() {
	}

}
</script>

<style lang="scss">
@import 'main.scss';
#app {
	min-height: 100vh;
	height: 100%;
	width: 100%;
	background: red;
}
#color-wheel {
	margin: 0 auto;
}
.color-input {

}
.app-page {
	display: flex;
	max-width: 1024px;
	margin: 0 auto;
	.panel {
		margin-top: 100px;
		margin-bottom: 100px;
		border: 1px solid #fff;
		padding: 20px;
		border-radius: 5px;
		background: #fff;
	}
}
.code-field {
	.control {
			&:hover {
				.copy-code {
					cursor: pointer;
					opacity: 1;
				}
		}
	}
}
pre {
	padding: 0;
}
.control {
	margin-bottom: 10px;
}
.footer {
	background: transparent;
	color: white;
	a {
		color: white;
		&:hover {
			text-decoration: underline;
		}
	}
}
.copy-code {
	position: absolute;
	top: 0;
	right: 0;
	font-size: 12px;
	padding: 8px;
	opacity: 0;
	color: #222;
	transition: opacity 100ms;
}
</style>
