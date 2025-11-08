import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { createInterface } from 'node:readline';
import { SlugEngine } from './core/slugify';
import type { CLIOptions, SlugOptions } from './core/types';
import { version } from '../package.json';

/**
 * CLI color codes
 */
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

/**
 * Print colored message
 */
function print(message: string, color: keyof typeof colors = 'reset'): void {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Print error message
 */
function printError(message: string): void {
  console.error(`${colors.red}✖ ${message}${colors.reset}`);
  process.exit(1);
}

/**
 * Print success message
 */
function printSuccess(message: string): void {
  print(`✔ ${message}`, 'green');
}

/**
 * Print help message
 */
function printHelp(): void {
  console.log(`
${colors.cyan}${colors.bright}better-slug v${version}${colors.reset}
${colors.dim}The most powerful, flexible, and performant slug library${colors.reset}

${colors.yellow}Usage:${colors.reset}
  better-slug [options] <input>
  bslug [options] <input>

${colors.yellow}Options:${colors.reset}
  ${colors.green}-h, --help${colors.reset}              Show help
  ${colors.green}-v, --version${colors.reset}           Show version
  ${colors.green}-l, --locale <lang>${colors.reset}     Set locale (e.g., en, fa, ar, zh)
  ${colors.green}-s, --separator <char>${colors.reset}  Set separator (default: "-")
  ${colors.green}-c, --case <style>${colors.reset}      Set case style (lower|upper|title|camel|pascal|preserve)
  ${colors.green}-m, --mode <mode>${colors.reset}       Set mode (normal|strict|pretty|rfc3986|filename|id)
  ${colors.green}-e, --emojis <strategy>${colors.reset} Handle emojis (remove|name|unicode|preserve)
  ${colors.green}--max-length <n>${colors.reset}        Set maximum length
  ${colors.green}--truncate <strategy>${colors.reset}   Set truncation strategy (word|char|smart)
  ${colors.green}--remove-stop-words${colors.reset}     Remove stop words
  ${colors.green}--preserve-unicode${colors.reset}      Preserve Unicode characters
  ${colors.green}--no-transliterate${colors.reset}      Disable transliteration
  ${colors.green}-f, --file <path>${colors.reset}       Read input from file
  ${colors.green}-o, --output <path>${colors.reset}     Write output to file
  ${colors.green}--json${colors.reset}                  Output as JSON with metadata
  ${colors.green}--verbose${colors.reset}               Show detailed output
  ${colors.green}--benchmark${colors.reset}             Show performance metrics
  ${colors.green}--interactive${colors.reset}           Interactive mode

${colors.yellow}Examples:${colors.reset}
  ${colors.dim}# Basic usage${colors.reset}
  better-slug "Hello World!"
  ${colors.dim}# Output: hello-world${colors.reset}

  ${colors.dim}# Farsi to English (Finglish)${colors.reset}
  better-slug "سلام دنیا" --locale fa
  ${colors.dim}# Output: salam-donya${colors.reset}

  ${colors.dim}# Keep original language${colors.reset}
  better-slug "你好世界" --locale preserve
  ${colors.dim}# Output: 你好世界${colors.reset}

  ${colors.dim}# Convert emojis to names${colors.reset}
  better-slug "I ❤️ Node.js!" --emojis name
  ${colors.dim}# Output: i-heart-node-js${colors.reset}

  ${colors.dim}# File processing${colors.reset}
  better-slug -f input.txt -o output.txt

  ${colors.dim}# JSON output with metadata${colors.reset}
  better-slug "Test String" --json

  ${colors.dim}# Interactive mode${colors.reset}
  better-slug --interactive

${colors.yellow}Supported Languages (50+):${colors.reset}
  ${colors.dim}en (English), fa (Farsi/Persian), ar (Arabic), zh (Chinese),
  ja (Japanese), ko (Korean), ru (Russian), de (German), fr (French),
  es (Spanish), it (Italian), pt (Portuguese), nl (Dutch), sv (Swedish),
  no (Norwegian), da (Danish), fi (Finnish), is (Icelandic), pl (Polish),
  cs (Czech), sk (Slovak), hu (Hungarian), ro (Romanian), bg (Bulgarian),
  hr (Croatian), sr (Serbian), uk (Ukrainian), be (Belarusian),
  el (Greek), tr (Turkish), he (Hebrew), hi (Hindi), bn (Bengali),
  ta (Tamil), te (Telugu), th (Thai), vi (Vietnamese), id (Indonesian),
  ms (Malay), tl (Tagalog), ur (Urdu), gu (Gujarati), kn (Kannada),
  ml (Malayalam), si (Sinhala), my (Burmese), ka (Georgian),
  am (Amharic), km (Khmer), lo (Lao)${colors.reset}

${colors.cyan}For more information: https://github.com/yourusername/better-slug${colors.reset}
`);
}

/**
 * Parse command line arguments
 */
function parseArgs(args: string[]): CLIOptions {
  const options: CLIOptions = {};
  const inputs: string[] = [];
  
  for (let i = 2; i < args.length; i++) {
    const arg = args[i];
    const nextArg = args[i + 1];
    
    switch (arg) {
      case '-h':
      case '--help':
        printHelp();
        process.exit(0);
        break;
      
      case '-v':
      case '--version':
        console.log(version);
        process.exit(0);
        break;
      
      case '-l':
      case '--locale':
        if (!nextArg) printError('Locale option requires a value');
        options.locale = nextArg as any;
        i++;
        break;
      
      case '-s':
      case '--separator':
        if (!nextArg) printError('Separator option requires a value');
        options.separator = nextArg;
        i++;
        break;
      
      case '-c':
      case '--case':
        if (!nextArg) printError('Case option requires a value');
        options.caseStyle = nextArg as any;
        i++;
        break;
      
      case '-m':
      case '--mode':
        if (!nextArg) printError('Mode option requires a value');
        options.mode = nextArg as any;
        i++;
        break;
      
      case '-e':
      case '--emojis':
        if (!nextArg) printError('Emojis option requires a value');
        options.emojis = nextArg as any;
        i++;
        break;
      
      case '--max-length':
        if (!nextArg) printError('Max length option requires a value');
        options.maxLength = parseInt(nextArg!, 10);
        if (isNaN(options.maxLength)) printError('Max length must be a number');
        i++;
        break;
      
      case '--truncate':
        if (!nextArg) printError('Truncate option requires a value');
        options.truncate = nextArg as any;
        i++;
        break;
      
      case '--remove-stop-words':
        options.removeStopWords = true;
        break;
      
      case '--preserve-unicode':
        options.preserveUnicode = true;
        break;
      
      case '--no-transliterate':
        options.transliterate = false;
        break;
      
      case '-f':
      case '--file':
        if (!nextArg) printError('File option requires a path');
        options.file = nextArg;
        i++;
        break;
      
      case '-o':
      case '--output':
        if (!nextArg) printError('Output option requires a path');
        options.output = nextArg;
        i++;
        break;
      
      case '--json':
        options.json = true;
        break;
      
      case '--verbose':
        options.verbose = true;
        break;
      
      case '--benchmark':
        options.benchmark = true;
        break;
      
      case '--interactive':
        runInteractiveMode();
        process.exit(0);
        break;
      
      default:
        if (!arg?.startsWith('-')) {
          inputs.push(arg!);
        } else {
          printError(`Unknown option: ${arg}`);
        }
    }
  }
  
  if (inputs.length > 0) {
    options.input = inputs.join(' ');
  }
  
  return options;
}

/**
 * Run interactive mode
 */
function runInteractiveMode(): void {
  print('\n🚀 Better Slug Interactive Mode\n', 'cyan');
  print('Type your text and press Enter to slugify. Type "exit" to quit.\n', 'dim');
  
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: `${colors.green}> ${colors.reset}`,
  });
  
  const engine = new SlugEngine();
  
  rl.prompt();
  
  rl.on('line', (line) => {
    const input = line.trim();
    
    if (input === 'exit' || input === 'quit') {
      print('\n👋 Goodbye!\n', 'yellow');
      rl.close();
      process.exit(0);
    }
    
    if (input.startsWith('set ')) {
      const [, option, ...values] = input.split(' ');
      const value = values.join(' ');
      
      try {
        const options: Partial<SlugOptions> = {};
        
        switch (option) {
          case 'locale':
            options.locale = value as any;
            break;
          case 'separator':
            options.separator = value;
            break;
          case 'case':
            options.caseStyle = value as any;
            break;
          case 'mode':
            options.mode = value as any;
            break;
          default:
            print(`Unknown option: ${option}`, 'red');
        }
        
        engine.updateOptions(options);
        print(`✔ ${option} set to: ${value}`, 'green');
      } catch (error) {
        print(`✖ Error: ${error instanceof Error ? error.message : 'Unknown error'}`, 'red');
      }
    } else if (input) {
      const start = performance.now();
      const result = engine.slugify(input);
      const end = performance.now();
      
      print(`${colors.blue}Result:${colors.reset} ${colors.bright}${result.slug}${colors.reset}`);
      print(`${colors.dim}Time: ${(end - start).toFixed(3)}ms${colors.reset}`);
    }
    
    rl.prompt();
  });
}

/**
 * Process file input
 */
function processFile(filePath: string, options: SlugOptions): string[] {
  const fullPath = resolve(filePath);
  
  if (!existsSync(fullPath)) {
    printError(`File not found: ${filePath}`);
  }
  
  const content = readFileSync(fullPath, 'utf-8');
  const lines = content.split('\n').filter(line => line.trim());
  const engine = new SlugEngine(options);
  
  return lines.map(line => engine.slugify(line).slug);
}

/**
 * Main CLI function
 */
function main(): void {
  const args = process.argv;
  
  if (args.length === 2) {
    printHelp();
    process.exit(0);
  }
  
  const options = parseArgs(args);
  
  // Remove CLI-specific options for slug engine
  const slugOptions: SlugOptions = { ...options };
  delete (slugOptions as any).input;
  delete (slugOptions as any).file;
  delete (slugOptions as any).output;
  delete (slugOptions as any).json;
  delete (slugOptions as any).verbose;
  delete (slugOptions as any).benchmark;
  
  let input = options.input || '';
  let results: string[] = [];
  
  // Process input
  if (options.file) {
    results = processFile(options.file, slugOptions);
    if (options.verbose) {
      printSuccess(`Processed ${results.length} lines from ${options.file}`);
    }
  } else if (input) {
    const engine = new SlugEngine(slugOptions);
    const start = options.benchmark ? performance.now() : 0;
    const result = engine.slugify(input);
    const end = options.benchmark ? performance.now() : 0;
    
    if (options.json) {
      console.log(JSON.stringify(result, null, 2));
      process.exit(0);
    }
    
    if (options.verbose) {
      print(`\n${colors.cyan}Input:${colors.reset} ${input}`);
      print(`${colors.green}Output:${colors.reset} ${result.slug}`);
      if (result.locale) {
        print(`${colors.yellow}Locale:${colors.reset} ${result.locale}`);
      }
      if (result.truncated) {
        print(`${colors.yellow}Truncated:${colors.reset} yes`);
      }
      if (options.benchmark) {
        print(`${colors.magenta}Time:${colors.reset} ${(end - start).toFixed(3)}ms`);
      }
    } else {
      console.log(result.slug);
    }
    
    results = [result.slug];
  } else {
    // Read from stdin
    let stdinData = '';
    process.stdin.setEncoding('utf8');
    
    process.stdin.on('readable', () => {
      const chunk = process.stdin.read();
      if (chunk !== null) {
        stdinData += chunk;
      }
    });
    
    process.stdin.on('end', () => {
      if (stdinData) {
        const engine = new SlugEngine(slugOptions);
        const result = engine.slugify(stdinData.trim());
        console.log(result.slug);
      }
    });
    
    return;
  }
  
  // Output results
  if (options.output && results.length > 0) {
    writeFileSync(resolve(options.output), results.join('\n'));
    if (options.verbose) {
      printSuccess(`Output written to ${options.output}`);
    }
  }
}

const isMainModule = import.meta.url === `file://${process.argv[1]}`;


  main();



export { main };