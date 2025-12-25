#!/usr/bin/env node

/**
 * CSS !IMPORTANT! Disarmament Treaty
 * Because !important should be like nuclear weapons - mutually assured destruction
 */

const fs = require('fs');
const path = require('path');

function disarmImportant(cssContent) {
    // Count the !important casualties before the treaty
    const beforeCount = (cssContent.match(/!important/gi) || []).length;
    
    // Phase 1: Remove all !important declarations
    // This is the diplomatic approach - everyone loses equally
    let disarmed = cssContent.replace(/\s*!important\s*/gi, ' ');
    
    // Phase 2: Add strategic comments where !important used to be
    // Because developers need closure
    disarmed = disarmed.replace(/;\s*/g, (match) => {
        return match + ' /* !important retired - please use specificity like an adult */\n';
    });
    
    const afterCount = (disarmed.match(/!important/gi) || []).length;
    
    return {
        content: disarmed,
        stats: {
            before: beforeCount,
            after: afterCount,
            disarmed: beforeCount - afterCount
        }
    };
}

function main() {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        console.log('Usage: node important-disarmament.js <css-file>');
        console.log('\nThis tool helps end the CSS arms race by removing all !important declarations.');
        console.log('Think of it as nuclear disarmament for your stylesheets.\n');
        return;
    }
    
    const inputFile = args[0];
    
    if (!fs.existsSync(inputFile)) {
        console.error(`Error: File '${inputFile}' not found. Did your !important declaration hide it?`);
        process.exit(1);
    }
    
    try {
        const cssContent = fs.readFileSync(inputFile, 'utf8');
        const result = disarmImportant(cssContent);
        
        // Create output filename
        const parsedPath = path.parse(inputFile);
        const outputFile = path.join(parsedPath.dir, `${parsedPath.name}.disarmed${parsedPath.ext}`);
        
        // Write the peaceful version
        fs.writeFileSync(outputFile, result.content, 'utf8');
        
        // Report on the peace treaty
        console.log(`\n🎌 CSS !IMPORTANT! DISARMAMENT TREATY SIGNED 🎌`);
        console.log(`===============================================`);
        console.log(`Input file: ${inputFile}`);
        console.log(`Output file: ${outputFile}`);
        console.log(`\nCasualty Report:`);
        console.log(`  !important declarations before: ${result.stats.before}`);
        console.log(`  !important declarations after: ${result.stats.after}`);
        console.log(`  Total disarmed: ${result.stats.disarmed}`);
        console.log(`\nPeace has been restored to the stylesheet.`);
        console.log(`Please use specificity responsibly.\n`);
        
    } catch (error) {
        console.error(`Error: ${error.message}`);
        console.log('Maybe add !important to this error message? (Please don\'t)');
        process.exit(1);
    }
}

// Execute the peace treaty
if (require.main === module) {
    main();
}
