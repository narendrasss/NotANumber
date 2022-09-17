import * as Quiz from './components/Quiz/Quiz.stories'
import * as Sandbox from './components/Sandbox/Sandbox.stories'
import * as FlipExample from './_dist-content/magic-motion/components/FlipExample/FlipExample.stories'
import * as FlipFirst from './_dist-content/magic-motion/components/FlipFirst/FlipFirst.stories'
import * as FlipInverse from './_dist-content/magic-motion/components/FlipInverse/FlipInverse.stories'
import * as FlipLast from './_dist-content/magic-motion/components/FlipLast/FlipLast.stories'
import * as FlipLastReact from './_dist-content/magic-motion/components/FlipLastReact/FlipLastReact.stories'
import * as FlipOverview from './_dist-content/magic-motion/components/FlipOverview/FlipOverview.stories'
import * as FlipPlay from './_dist-content/magic-motion/components/FlipPlay/FlipPlay.stories'
import * as InitialPositionSandbox from './_dist-content/magic-motion/components/InitialPositionSandbox/InitialPositionSandbox.stories'
import * as InverseSandbox from './_dist-content/magic-motion/components/InverseSandbox/InverseSandbox.stories'
import * as MotionSandbox from './_dist-content/magic-motion/components/MotionSandbox/MotionSandbox.stories'
import * as PlaySandbox from './_dist-content/magic-motion/components/PlaySandbox/PlaySandbox.stories'
import * as SizeLayoutExample from './_dist-content/magic-motion/components/SizeLayoutExample/SizeLayoutExample.stories'
import * as SizeMeasurements from './_dist-content/magic-motion/components/SizeMeasurements/SizeMeasurements.stories'
import * as Tokenizer from './_dist-content/tokenizer/components/Tokenizer/Tokenizer.stories'
export const stories = [{ name: `shared`, stories: [{ name: 'Quiz', variants: Quiz },{ name: 'Sandbox', variants: Sandbox }] },
{ name: `magic-motion`, stories: [{ name: 'FlipExample', variants: FlipExample },{ name: 'FlipFirst', variants: FlipFirst },{ name: 'FlipInverse', variants: FlipInverse },{ name: 'FlipLast', variants: FlipLast },{ name: 'FlipLastReact', variants: FlipLastReact },{ name: 'FlipOverview', variants: FlipOverview },{ name: 'FlipPlay', variants: FlipPlay },{ name: 'InitialPositionSandbox', variants: InitialPositionSandbox },{ name: 'InverseSandbox', variants: InverseSandbox },{ name: 'MotionSandbox', variants: MotionSandbox },{ name: 'PlaySandbox', variants: PlaySandbox },{ name: 'SizeLayoutExample', variants: SizeLayoutExample },{ name: 'SizeMeasurements', variants: SizeMeasurements }] },
{ name: `tokenizer`, stories: [{ name: 'Tokenizer', variants: Tokenizer }] }];