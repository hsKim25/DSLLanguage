/**
 * Types and interfaces for the FC language
 */

import { AstNode } from 'langium';

export interface FCModule extends AstNode {
    date?: string;
    packageName: string;
    name: string;
    statements: Statement[];
}

export type Statement = ProcessStatement | IfStatement | ElseStatement | LoopStatement | GroupStatement |
    WhileStatement | DoStatement | ForStatement | SwitchStatement | CaseStatement | DefaultStatement |
    BreakStatement | ContinueStatement;

export interface ProcessStatement extends AstNode {
    $type: 'ProcessStatement';
    code: string;
}

export interface IfStatement extends AstNode {
    $type: 'IfStatement';
    condition: string;
    statements: Statement[];
}

export interface ElseStatement extends AstNode {
    $type: 'ElseStatement';
    statements: Statement[];
}

export interface LoopStatement extends AstNode {
    $type: 'LoopStatement';
    condition: string;
    statements: Statement[];
}

export interface GroupStatement extends AstNode {
    $type: 'GroupStatement';
    name: string;
    statements: Statement[];
}

export interface WhileStatement extends AstNode {
    $type: 'WhileStatement';
    condition: string;
    statements: Statement[];
}

export interface DoStatement extends AstNode {
    $type: 'DoStatement';
    condition: string;
    statements: Statement[];
}

export interface ForStatement extends AstNode {
    $type: 'ForStatement';
    init: string;
    condition: string;
    update: string;
    statements: Statement[];
}

export interface SwitchStatement extends AstNode {
    $type: 'SwitchStatement';
    condition: string;
    statements: Statement[];
}

export interface CaseStatement extends AstNode {
    $type: 'CaseStatement';
    value: string;
    statements: Statement[];
}

export interface DefaultStatement extends AstNode {
    $type: 'DefaultStatement';
    statements: Statement[];
}

export interface BreakStatement extends AstNode {
    $type: 'BreakStatement';
}

export interface ContinueStatement extends AstNode {
    $type: 'ContinueStatement';
} 