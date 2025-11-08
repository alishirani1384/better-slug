/**
 * Greek alphabet to Latin mapping
 */
export function getGreekCharmap(): Map<string, string> {
  const charmap = new Map<string, string>();
  
  // Greek alphabet
  charmap.set('Α', 'A');
  charmap.set('α', 'a');
  charmap.set('Β', 'B');
  charmap.set('β', 'b');
  charmap.set('Γ', 'G');
  charmap.set('γ', 'g');
  charmap.set('Δ', 'D');
  charmap.set('δ', 'd');
  charmap.set('Ε', 'E');
  charmap.set('ε', 'e');
  charmap.set('Ζ', 'Z');
  charmap.set('ζ', 'z');
  charmap.set('Η', 'H');
  charmap.set('η', 'h');
  charmap.set('Θ', 'Th');
  charmap.set('θ', 'th');
  charmap.set('Ι', 'I');
  charmap.set('ι', 'i');
  charmap.set('Κ', 'K');
  charmap.set('κ', 'k');
  charmap.set('Λ', 'L');
  charmap.set('λ', 'l');
  charmap.set('Μ', 'M');
  charmap.set('μ', 'm');
  charmap.set('Ν', 'N');
  charmap.set('ν', 'n');
  charmap.set('Ξ', 'X');
  charmap.set('ξ', 'x');
  charmap.set('Ο', 'O');
  charmap.set('ο', 'o');
  charmap.set('Π', 'P');
  charmap.set('π', 'p');
  charmap.set('Ρ', 'R');
  charmap.set('ρ', 'r');
  charmap.set('Σ', 'S');
  charmap.set('σ', 's');
  charmap.set('ς', 's');
  charmap.set('Τ', 'T');
  charmap.set('τ', 't');
  charmap.set('Υ', 'Y');
  charmap.set('υ', 'y');
  charmap.set('Φ', 'Ph');
  charmap.set('φ', 'ph');
  charmap.set('Χ', 'Ch');
  charmap.set('χ', 'ch');
  charmap.set('Ψ', 'Ps');
  charmap.set('ψ', 'ps');
  charmap.set('Ω', 'O');
  charmap.set('ω', 'o');
  
  // Greek diacritics
  charmap.set('ά', 'a');
  charmap.set('έ', 'e');
  charmap.set('ή', 'h');
  charmap.set('ί', 'i');
  charmap.set('ό', 'o');
  charmap.set('ύ', 'y');
  charmap.set('ώ', 'o');
  charmap.set('Ά', 'A');
  charmap.set('Έ', 'E');
  charmap.set('Ή', 'H');
  charmap.set('Ί', 'I');
  charmap.set('Ό', 'O');
  charmap.set('Ύ', 'Y');
  charmap.set('Ώ', 'O');
  charmap.set('ΐ', 'i');
  charmap.set('ΰ', 'y');
  charmap.set('Ϊ', 'I');
  charmap.set('Ϋ', 'Y');
  
  return charmap;
}