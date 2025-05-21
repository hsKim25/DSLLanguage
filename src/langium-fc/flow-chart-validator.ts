import type { ValidationAcceptor, ValidationChecks } from 'langium';
import type { FlowChartAstType, FCModule, ProcessStatement, IfStatement, ElseStatement,
    LoopStatement, DoStatement, SwitchStatement, CaseStatement, DefaultStatement } from './generated/ast.js';
import type { FlowChartServices } from './flow-chart-module.js';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: FlowChartServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.FlowChartValidator;
    const checks: ValidationChecks<FlowChartAstType> = {
        FCModule: validator.validateFCModule,
        // BreakStatement: validator.validateBreakStatement,
        CaseStatement: validator.validateCaseStatement,
        // ContinueStatement: validator.validateContinueStatement,
        DefaultStatement: validator.validateDefaultStatement,
        DoStatement: validator.validateDoStatement,
        ElseStatement: validator.validateElseStatement,
        // ForStatement: validator.validateForStatement,
        // GroupStatement: validator.validateGroupStatement,
        IfStatement: validator.validateIfStatement,
        LoopStatement: validator.validateLoopStatement,
        ProcessStatement: validator.validateProcessStatement,
        // Statement: validator.validateStatement,
        SwitchStatement: validator.validateSwitchStatement,
        // WhileStatement: validator.validateWhileStatement
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class FlowChartValidator {
    validateFCModule(module: FCModule, accept: ValidationAcceptor): void {
        // Check if module name is valid
        if (module.name.length === 0) {
            accept('error', 'Module name cannot be empty', { node: module, property: 'name' });
        }
        // Check if package name is valid
        if (module.packageName.length === 0) {
            accept('error', 'Package name cannot be empty', { node: module, property: 'packageName' });
        }
    }

    validateProcessStatement(statement: ProcessStatement, accept: ValidationAcceptor): void {
        // Check if code is empty
        if (statement.code.trim().length === 0) {
            accept('error', 'Process code cannot be empty', { node: statement, property: 'code' });
        }
    }

    validateIfStatement(statement: IfStatement, accept: ValidationAcceptor): void {
        // Check if condition is empty
        if (statement.condition.trim().length === 0) {
            accept('error', 'If condition cannot be empty', { node: statement, property: 'condition' });
        }
    }

    validateElseStatement(statement: ElseStatement, accept: ValidationAcceptor): void {
        // No specific validations needed for else statements
    }

    validateLoopStatement(statement: LoopStatement, accept: ValidationAcceptor): void {
        // Check if condition is empty
        if (statement.condition.trim().length === 0) {
            accept('error', 'Loop condition cannot be empty', { node: statement, property: 'condition' });
        }
    }

    // validateGroupStatement(statement: GroupStatement, accept: ValidationAcceptor): void {
    //     // Check if group name is valid
    //     if (statement.name.length === 0) {
    //         accept('error', 'Group name cannot be empty', { node: statement, property: 'name' });
    //     }
    // }
    
    // validateWhileStatement(statement: WhileStatement, accept: ValidationAcceptor): void {
    //     // Check if condition is empty
    //     if (statement.condition.trim().length === 0) {
    //         accept('error', 'While condition cannot be empty', { node: statement, property: 'condition' });
    //     }
    // }
    
    validateDoStatement(statement: DoStatement, accept: ValidationAcceptor): void {
        // Check if condition is empty
        if (statement.condition.trim().length === 0) {
            accept('error', 'Do-while condition cannot be empty', { node: statement, property: 'condition' });
        }
    }
    
    // validateForStatement(statement: ForStatement, accept: ValidationAcceptor): void {
    //     // Check if any part is missing
    //     if (statement.init.trim().length === 0) {
    //         accept('warning', 'For loop initialization is empty', { node: statement, property: 'init' });
    //     }
    //     if (statement.condition.trim().length === 0) {
    //         accept('warning', 'For loop condition is empty', { node: statement, property: 'condition' });
    //     }
    //     if (statement.update.trim().length === 0) {
    //         accept('warning', 'For loop update expression is empty', { node: statement, property: 'update' });
    //     }
    // }
    
    validateSwitchStatement(statement: SwitchStatement, accept: ValidationAcceptor): void {
        // Check if condition is empty
        if (statement.condition.trim().length === 0) {
            accept('error', 'Switch condition cannot be empty', { node: statement, property: 'condition' });
        }
        
        // Check if there's at least one case or default
        let hasCase = false;
        for (const stmt of statement.statements) {
            if (stmt.$type === 'CaseStatement' || stmt.$type === 'DefaultStatement') {
                hasCase = true;
                break;
            }
        }
        
        if (!hasCase) {
            accept('warning', 'Switch has no case statements', { node: statement });
        }
    }
    
    validateCaseStatement(statement: CaseStatement, accept: ValidationAcceptor): void {
        // Check if value is empty
        if (statement.value.trim().length === 0) {
            accept('error', 'Case value cannot be empty', { node: statement, property: 'value' });
        }
    }
    
    validateDefaultStatement(statement: DefaultStatement, accept: ValidationAcceptor): void {
        // No specific validations needed for default statements
    } 
    
}
