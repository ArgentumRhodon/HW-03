<script lang="ts">
	import {
		BlueNight,
		Summer84,
		Emerald,
		NoirLight,
		XPro,
		Rustic,
		Apollo
	} from '@skeletonlabs/skeleton';
</script>

<!-- Skeleton.dev default filters -->
<BlueNight />
<Summer84 />
<Emerald />
<NoirLight />
<XPro />
<Rustic />
<Apollo />

<!-- Custom filters made using https://fecolormatrix.com/ -->
<svg class="filter absolute -left-full w-0 h-0">
	<filter id="NewGroove">
		<feColorMatrix
			type="matrix"
			values=" 1.430  0.000 -0.176  0.000  0.000 
                 0.000  1.000  0.000  0.000  0.000 
                 0.000  0.000  1.000  0.000  0.000 
                 0.000  0.000  0.000  1.000  0.000"
		/>
	</filter>
</svg>

<svg class="filter absolute -left-full w-0 h-0">
	<filter id="RocketMan">
		<feColorMatrix
			type="matrix"
			values=" 1.500  0.000  0.000  0.000  0.030 
                 0.000  1.000  0.000  0.000  0.030 
                 0.000  0.000  1.500  0.000  0.030 
                 0.000  0.000  0.000  1.000  0.000"
		/>
	</filter>
</svg>

<svg class="filter absolute -left-full w-0 h-0">
	<filter id="SkeleTime">
		<feColorMatrix
			type="matrix"
			values=" 1.500  0.000  0.000  0.000  0.020 
                 0.000  1.000  0.000  0.000 -0.010 
                 0.000  0.000  1.500  0.000  0.020 
                 0.000  0.000  0.000  1.000  0.000"
		/>
	</filter>
</svg>

<svg class="filter absolute -left-full w-0 h-0">
	<filter id="Snowfall">
		<feColorMatrix
			type="matrix"
			values=" 1.000  0.000  0.872  0.000  0.000 
					 0.000  1.000  1.230  0.000  0.000 
					 0.000  0.000  4.120  0.000  0.000 
					 0.000  0.000  0.691  1.000  0.000"
		/>
	</filter>
</svg>
