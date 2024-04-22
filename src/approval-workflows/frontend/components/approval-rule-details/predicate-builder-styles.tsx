import React from "react";
export const PredicateBuilderStyles = () => (
  <style>{`
    .predicateBuilder .qb-drag-handler {
      display: none;
    }
    .predicateBuilder .group-or-rule-container.group-container {
      padding: 0.5rem;
      margin-top: 0.5rem;
      border-width: 1px;
    }
    .predicateBuilder .group--actions {
      display: flex;
      column-gap: 0.5rem;
      justify-content: flex-end;
    }
    .predicateBuilder .group--actions button {
      overflow: hidden;
      position: relative;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      border-radius: 4px;
      outline-offset: 0px;
      font-weight: 500;
      font-size: 0.75rem;
      line-height: 1rem;
      transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 300ms;
      background-color: rgb(23 58 95);
      color: #ffffff;
    }

    .predicateBuilder .group--conjunctions input[type='radio'],
    .predicateBuilder .rule--widget--BOOLEAN .widget--widget input[type='radio'] {
      display: none;
    }
    .predicateBuilder .group--conjunctions label,
    .predicateBuilder .rule--widget--BOOLEAN .widget--widget label {
      display: inline-block;
      line-height: 24px;
      padding-left: 0.25rem;
      padding-right: 0.25rem;
      border-width: 1px;
      border-radius: 4px;
      text-align: center;
      cursor: pointer;
      color: #000000;
    }
    .predicateBuilder .group--conjunctions input[type='radio']:checked + label,
    .predicateBuilder .rule--widget--BOOLEAN .widget--widget input[type='radio']:checked + label {
      color: #ffffff;
      background-color: rgb(23 58 95);
    }
    .predicateBuilder .rule {
      display: flex;
      margin-top: 0.5rem;
      align-items: center;
    }
    .predicateBuilder .rule .rule--body {
      display: flex;
      column-gap: 0.25rem;
      align-items: center;
      flex-wrap: nowrap;
    }
    .predicateBuilder .rule .rule--body .rule--value .rule--widget {
      display: flex;
      column-gap: 0.25rem;
      align-items: center;
    }
    .predicateBuilder .rule .rule--header button {
      display: flex;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      margin-left: 0.5rem;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      border-width: 1px;
      border-color: transparent;
      font-size: 0.75rem;
      line-height: 1rem;
      font-weight: 500;
      color: #ffffff;
      background-color: rgb(205 63 80);
      transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 300ms;
      transition-duration: 200ms;
      transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    .predicateBuilder .rule .rule--widget--DATETIME {
      display: flex;
      flex-direction: column;
    }
    .predicateBuilder .rule .rule--widget--TEXT input,
    .predicateBuilder .rule .rule--widget--DATETIME input,
    .predicateBuilder .rule .rule--widget--NUMBER input {
      display: flex;
      border-radius: 0.125rem;
      border-width: 1px;
      border-color: #d1d5db;
      color: #4b5563;
      background-color: #ffffff;
      padding-right: 0;
      padding-left: 0.75rem;
      width: 100%;
    }
    .predicateBuilder .rule .rule--operator select {
      display: flex;
      border-radius: 0.125rem;
      border-width: 1px;
      border-color: #d1d5db;
      color: #4b5563;
      background-color: #ffffff;
      padding-right: 0;
      padding-left: 0.75rem;
      width: 100%;
    }
    .predicateBuilder .rule .rule--field select {
      display: flex;
      border-radius: 0.125rem;
      border-width: 1px;
      border-color: #d1d5db;
      color: #4b5563;
      background-color: #ffffff;
      padding-right: 0;
      padding-left: 0.75rem;
      width: 100%;
    }
  `}</style>
);
