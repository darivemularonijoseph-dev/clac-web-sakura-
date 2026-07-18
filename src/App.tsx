/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Calculator from './components/Calculator';
import PetalBackground from './components/PetalBackground';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-pink-100 to-pink-50 flex items-center justify-center p-4 font-sans text-pink-950 overflow-hidden relative">
      <PetalBackground />
      <Calculator />
    </div>
  );
}

