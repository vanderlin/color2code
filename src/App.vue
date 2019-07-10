
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
								<div class="field" v-for="(item, title) in codes" :key="item.title">
										<label class="label">{{title}}</label>
										<div class="control" v-for="(code, j) in item.code" :key="j">
											<code class="html is-6">{{code}}</code>
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
import VueClipboard from 'vue-clipboard2'

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
		VueClipboard
	},

	methods: {
		randomColor() {
			return tinycolor({r:_.random(255), g:_.random(255), b:_.random(255)});
		},
	},

	computed: {
		codes() {
			let color = tinycolor(this.color);
			
			let rgb = color.toRgb();
			
			let r = (rgb.r).toFixed(2);
			let g = (rgb.g).toFixed(2);
			let b = (rgb.b).toFixed(2);
			let a = (rgb.a * 255).toFixed(2);

			let rf = (rgb.r / 255.0).toFixed(2);
			let gf = (rgb.g / 255.0).toFixed(2);
			let bf = (rgb.b / 255.0).toFixed(2);
			let af= (rgb.a).toFixed(2);

			return {
				'HTML/CSS': {
					code: [
						color.toHexString(),
						`background-color: ${color.toString()}`,
						`background: ${color.toString()}`,
						`color: ${color.toString()}`
					]
				},
				'iOS': {
					code: [`UIColor * color = [UIColor colorWithRed:${rf} green:${gf} blue:${bf} alpha:${af}];`]
				},
				'Objective C': {
					code: [`NSColor * color = [NSColor colorWithDeviceRed:${rf} green:${gf} blue:${bf} alpha:${af}];`]
				},
				'OpenFrameworks': {
					code: [
						`ofColor color = ofColor(${r}, ${g}, ${b}, ${a});`,
						`ofFloatColor color = ofFloatColor(${rf}, ${gf}, ${bf}, ${af});`,
						`ofSetColor(${r}, ${g}, ${b}, ${a});`,
					]
				},
				'Cinder': {
					code: [
						`ci::ColorA color(CM_RGB, ${r}, ${g}, ${b}, ${a});`,
					]
				},
				'Processing': {
					code: [
						`Color color = new Color(${r}, ${g}, ${b}, ${a});`,
					]
				},
				'C/C++': {
					code: [
						`float color[4] = {${rf}, ${gf}, ${bf}, ${af}};`,
						`int color[4] = {${r}, ${g}, ${b}, ${a}};`,
					]
				},
				'OpenGL': {
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
code {
	padding: 2px 4px;
	color: #d14;
	white-space: nowrap;
	background-color: #f7f7f9;
	border: 1px solid #e1e1e8;
	font-size: 18px;
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
</style>
