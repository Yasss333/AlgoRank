import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

// Sample DSA problems with realistic data
const problems = [
  // Amazon Problems - Easy
  {
    title: "Two Sum",
    description:
      "Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target. You may assume each input would have exactly one solution, and you cannot use the same element twice.",
    difficulty: "EASY",
    tags: ["Array", "Amazon", "Easy", "LeetCode Top 75", "Hash Map"],
    examples: {
      example1: {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "The sum of 2 and 7 is 9. Therefore, index 0 and 1 are returned.",
      },
      example2: {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "The sum of 2 and 4 is 6. Therefore, index 1 and 2 are returned.",
      },
    },
    constraints: "2 <= nums.length <= 10^4, -10^9 <= nums[i] <= 10^9",
    testcases: [
      { input: "[2,7,11,15]\n9", output: "[0,1]" },
      { input: "[3,2,4]\n6", output: "[1,2]" },
      { input: "[3,3]\n6", output: "[0,1]" },
    ],
    codeSnippets: {
      JAVASCRIPT: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Write your solution here
};`,
      PYTHON: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Write your solution here
        pass`,
      JAVA: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        return new int[]{};
    }
}`,
    },
    hints: "Use a hash map to store values and their indices for O(n) solution",
  },

  {
    title: "Reverse String",
    description:
      "Write a function that reverses a string. The input string is given as an array of characters s. You must do this by modifying the input array in-place with O(1) extra memory.",
    difficulty: "EASY",
    tags: ["String", "Two Pointers", "Amazon", "Easy"],
    examples: {
      example1: {
        input: 's = ["h","e","l","l","o"]',
        output: '["o","l","l","e","h"]',
        explanation: "The string 'hello' becomes 'olleh' when reversed.",
      },
    },
    constraints: "1 <= s.length <= 10^5",
    testcases: [
      { input: '["h","e","l","l","o"]', output: '["o","l","l","e","h"]' },
      { input: '["H","a","n","n","a","h"]', output: '["h","a","n","n","a","H"]' },
    ],
    codeSnippets: {
      JAVASCRIPT: `var reverseString = function(s) {
    // Write your solution here
};`,
      PYTHON: `class Solution:
    def reverseString(self, s: List[str]) -> None:
        # Write your solution here
        pass`,
    },
    hints: "Use two pointers from start and end, swap them and move towards center",
  },

  // Google Problems - Easy
  {
    title: "Contains Duplicate",
    description:
      "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
    difficulty: "EASY",
    tags: ["Array", "Google", "Easy", "Hash Set"],
    examples: {
      example1: {
        input: "nums = [1,2,3,1]",
        output: "true",
        explanation: "The value 1 appears at indices 0 and 3.",
      },
    },
    constraints: "1 <= nums.length <= 10^5",
    testcases: [
      { input: "[1,2,3,1]", output: "true" },
      { input: "[1,2,3,4]", output: "false" },
    ],
    codeSnippets: {
      JAVASCRIPT: `var containsDuplicate = function(nums) {
    // Write your solution here
};`,
      PYTHON: `class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        # Write your solution here
        pass`,
    },
    hints: "Use a Set to track seen numbers",
  },

  // Microsoft Problems - Medium
  {
    title: "LongestSubstring Without Repeating Characters",
    description:
      "Given a string s, find the length of the longest substring without repeating characters.",
    difficulty: "MEDIUM",
    tags: ["String", "Sliding Window", "Microsoft", "Medium", "LeetCode Top 75"],
    examples: {
      example1: {
        input: 's = "abcabcbb"',
        output: "3",
        explanation: "The answer is 'abc', with the length of 3.",
      },
    },
    constraints: "0 <= s.length <= 5 * 10^4",
    testcases: [
      { input: '"abcabcbb"', output: "3" },
      { input: '"bbbbb"', output: "1" },
      { input: '"pwwkew"', output: "3" },
    ],
    codeSnippets: {
      JAVASCRIPT: `var lengthOfLongestSubstring = function(s) {
    // Write your solution here
};`,
      PYTHON: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        # Write your solution here
        pass`,
    },
    hints: "Use sliding window with a hash map to track character positions",
  },

  {
    title: "Merge Two Sorted Lists",
    description:
      "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the two lists.",
    difficulty: "MEDIUM",
    tags: ["Linked List", "Microsoft", "Medium"],
    examples: {
      example1: {
        input: "list1 = [1,2,4], list2 = [1,3,4]",
        output: "[1,1,2,3,4,4]",
        explanation: "Both lists are merged into one sorted list.",
      },
    },
    constraints: "The number of nodes in both lists is in the range [0, 50]",
    testcases: [
      { input: "[1,2,4]\n[1,3,4]", output: "[1,1,2,3,4,4]" },
      { input: "[]\n[]", output: "[]" },
    ],
    codeSnippets: {
      JAVASCRIPT: `var mergeTwoLists = function(list1, list2) {
    // Write your solution here
};`,
      PYTHON: `class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        # Write your solution here
        pass`,
    },
    hints: "Use two pointers and compare node values",
  },

  // Facebook/Meta Problems - Medium
  {
    title: "Binary Tree Level Order Traversal",
    description:
      "Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).",
    difficulty: "MEDIUM",
    tags: ["Tree", "BFS", "Meta", "Medium", "LeetCode Top 75"],
    examples: {
      example1: {
        input: "root = [3,9,20,null,null,15,7]",
        output: "[[3],[9,20],[15,7]]",
        explanation: "Level order traversal of the binary tree.",
      },
    },
    constraints: "The number of nodes in the tree is in the range [0, 2000]",
    testcases: [
      { input: "[3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]" },
      { input: "[1]", output: "[[1]]" },
      { input: "[]", output: "[]" },
    ],
    codeSnippets: {
      JAVASCRIPT: `var levelOrder = function(root) {
    // Write your solution here
};`,
      PYTHON: `class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        # Write your solution here
        pass`,
    },
    hints: "Use BFS with a queue data structure",
  },

  // Apple Problems - Hard
  {
    title: "Median of Two Sorted Arrays",
    description:
      "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).",
    difficulty: "HARD",
    tags: ["Array", "Binary Search", "Apple", "Hard", "LeetCode Top 75"],
    examples: {
      example1: {
        input: "nums1 = [1,3], nums2 = [2]",
        output: "2.0",
        explanation: "merged array = [1,2,3] and median is 2.",
      },
    },
    constraints: "nums1.length == m, nums2.length == n",
    testcases: [
      { input: "[1,3]\n[2]", output: "2.0" },
      { input: "[1,2]\n[3,4]", output: "2.5" },
    ],
    codeSnippets: {
      JAVASCRIPT: `var findMedianSortedArrays = function(nums1, nums2) {
    // Write your solution here
};`,
      PYTHON: `class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        # Write your solution here
        pass`,
    },
    hints: "Use binary search to partition arrays efficiently",
  },

  // Basics - Easy
  {
    title: "Valid Parentheses",
    description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: all brackets are closed, brackets close in the correct order.",
    difficulty: "EASY",
    tags: ["String", "Stack", "Basics", "Easy", "LeetCode Top 75"],
    examples: {
      example1: {
        input: 's = "()"',
        output: "true",
        explanation: "Valid parentheses.",
      },
    },
    constraints: "1 <= s.length <= 10^4",
    testcases: [
      { input: '"()"', output: "true" },
      { input: '"()[]{}"', output: "true" },
      { input: '"(]"', output: "false" },
    ],
    codeSnippets: {
      JAVASCRIPT: `var isValid = function(s) {
    // Write your solution here
};`,
      PYTHON: `class Solution:
    def isValid(self, s: str) -> bool:
        # Write your solution here
        pass`,
    },
    hints: "Use a stack to match closing brackets with opening ones",
  },

  {
    title: "Maximum Subarray",
    description:
      "Given an integer array nums, find the subarray with the largest sum, and return its sum. A subarray is a contiguous non-empty sequence of elements within an array.",
    difficulty: "MEDIUM",
    tags: ["Array", "Dynamic Programming", "Basics", "Medium", "LeetCode Top 75"],
    examples: {
      example1: {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "The subarray [4,-1,2,1] has the largest sum = 6.",
      },
    },
    constraints: "1 <= nums.length <= 10^5",
    testcases: [
      { input: "[-2,1,-3,4,-1,2,1,-5,4]", output: "6" },
      { input: "[1]", output: "1" },
      { input: "[-2147483647]", output: "-2147483647" },
    ],
    codeSnippets: {
      JAVASCRIPT: `var maxSubArray = function(nums) {
    // Write your solution here
};`,
      PYTHON: `class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        # Write your solution here
        pass`,
    },
    hints: "Use Kadane's algorithm for O(n) solution",
  },

  {
    title: "Merge K Sorted Lists",
    description:
      "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
    difficulty: "HARD",
    tags: ["Linked List", "Heap", "Divide and Conquer", "Hard", "LeetCode Top 75"],
    examples: {
      example1: {
        input: "lists = [[1,4,5],[1,3,4],[2,6]]",
        output: "[1,1,2,1,3,4,4,5,6]",
        explanation: "All linked lists merged into one sorted list.",
      },
    },
    constraints: "k == lists.length, 0 <= k <= 10^4",
    testcases: [
      { input: "[[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,1,3,4,4,5,6]" },
      { input: "[]", output: "[]" },
    ],
    codeSnippets: {
      JAVASCRIPT: `var mergeKLists = function(lists) {
    // Write your solution here
};`,
      PYTHON: `class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        # Write your solution here
        pass`,
    },
    hints: "Use a min heap or divide and conquer approach",
  },

  // Array Problems
  {
    title: "Best Time to Buy and Sell Stock",
    description:
      "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.",
    difficulty: "EASY",
    tags: ["Array", "Amazon", "Easy"],
    examples: {
      example1: {
        input: "prices = [7,1,5,3,6,4]",
        output: "5",
        explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.",
      },
    },
    constraints: "1 <= prices.length <= 10^5, 0 <= prices[i] <= 10^4",
    testcases: [
      { input: "[7,1,5,3,6,4]", output: "5" },
      { input: "[7,6,4,3,1]", output: "0" },
    ],
    codeSnippets: {
      JAVASCRIPT: `var maxProfit = function(prices) {
    // Write your solution here
};`,
      PYTHON: `class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        # Write your solution here
        pass`,
    },
    hints: "Track minimum price seen so far and calculate max profit",
  },

  {
    title: "Product of Array Except Self",
    description:
      "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. You must write an algorithm that runs in O(n) time and without using the division operation.",
    difficulty: "MEDIUM",
    tags: ["Array", "Google", "Medium"],
    examples: {
      example1: {
        input: "nums = [1,2,3,4]",
        output: "[24,12,8,6]",
        explanation: "Product of elements except self.",
      },
    },
    constraints: "2 <= nums.length <= 10^5",
    testcases: [
      { input: "[1,2,3,4]", output: "[24,12,8,6]" },
      { input: "[-1,1,0,-3,3]", output: "[0,0,9,0,0]" },
    ],
    codeSnippets: {
      JAVASCRIPT: `var productExceptSelf = function(nums) {
    // Write your solution here
};`,
      PYTHON: `class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        # Write your solution here
        pass`,
    },
    hints: "Use prefix and suffix products without division",
  },

  // String Problems
  {
    title: "Group Anagrams",
    description:
      "Given an array of strings strs, group the anagrams together. You can return the answer in any order. An anagram is a word or phrase formed by rearranging the letters of a different word or phrase.",
    difficulty: "MEDIUM",
    tags: ["String", "Hash Map", "Microsoft", "Medium"],
    examples: {
      example1: {
        input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
        output: '[["bat"],["nat","tan"],["ate","eat","tea"]]',
        explanation: "Anagrams grouped together.",
      },
    },
    constraints: "1 <= strs.length <= 10^4",
    testcases: [
      { input: '["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' },
    ],
    codeSnippets: {
      JAVASCRIPT: `var groupAnagrams = function(strs) {
    // Write your solution here
};`,
      PYTHON: `class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        # Write your solution here
        pass`,
    },
    hints: "Sort strings and use a hash map to group anagrams",
  },

  {
    title: "Longest Palindromic Substring",
    description:
      "Given a string s, return the longest palindromic substring in s. A palindrome is a word that reads the same forwards and backwards.",
    difficulty: "MEDIUM",
    tags: ["String", "Dynamic Programming", "Meta", "Medium"],
    examples: {
      example1: {
        input: 's = "babad"',
        output: '"bab"',
        explanation: 'Both "bab" and "aba" are valid answers.',
      },
    },
    constraints: "1 <= s.length <= 1000",
    testcases: [
      { input: '"babad"', output: '"bab"' },
      { input: '"cbbd"', output: '"bb"' },
    ],
    codeSnippets: {
      JAVASCRIPT: `var longestPalindrome = function(s) {
    // Write your solution here
};`,
      PYTHON: `class Solution:
    def longestPalindrome(self, s: str) -> str:
        # Write your solution here
        pass`,
    },
    hints: "Expand around centers or use dynamic programming",
  },

  // Tree Problems
  {
    title: "Invert Binary Tree",
    description:
      "Given the root of a binary tree, invert the tree, and return its root. Inverting means flipping the left and right child nodes of every node in the tree.",
    difficulty: "EASY",
    tags: ["Tree", "Apple", "Easy"],
    examples: {
      example1: {
        input: "root = [4,2,7,1,3,6,9]",
        output: "[4,7,2,9,6,3,1]",
        explanation: "Tree is inverted.",
      },
    },
    constraints: "The number of nodes in the tree is in the range [0, 100]",
    testcases: [
      { input: "[4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]" },
      { input: "[2,1,3]", output: "[2,3,1]" },
    ],
    codeSnippets: {
      JAVASCRIPT: `var invertTree = function(root) {
    // Write your solution here
};`,
      PYTHON: `class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        # Write your solution here
        pass`,
    },
    hints: "Recursively swap left and right children",
  },

  {
    title: "Diameter of Binary Tree",
    description:
      "Given the root of a binary tree, return the length of the diameter of the tree. The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.",
    difficulty: "EASY",
    tags: ["Tree", "Google", "Easy"],
    examples: {
      example1: {
        input: "root = [1,2,3,4,5]",
        output: "3",
        explanation: "The diameter is the path [4,2,1,3] or [5,2,1,3].",
      },
    },
    constraints: "The number of nodes in the tree is in the range [1, 10^4]",
    testcases: [
      { input: "[1,2,3,4,5]", output: "3" },
      { input: "[1,2]", output: "1" },
    ],
    codeSnippets: {
      JAVASCRIPT: `var diameterOfBinaryTree = function(root) {
    // Write your solution here
};`,
      PYTHON: `class Solution:
    def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:
        # Write your solution here
        pass`,
    },
    hints: "DFS to find depth and track maximum diameter",
  },

  // More Medium Problems
  {
    title: "Word Ladder",
    description:
      "Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.",
    difficulty: "MEDIUM",
    tags: ["BFS", "Graph", "Amazon", "Medium"],
    examples: {
      example1: {
        input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]',
        output: "5",
        explanation: "Shortest sequence: hit -> hot -> dot -> dog -> cog.",
      },
    },
    constraints: "1 <= beginWord.length <= 10, 1 <= endWord.length <= 10",
    testcases: [
      { input: '"hit","cog","[hot,dot,dog,lot,log,cog]"', output: "5" },
    ],
    codeSnippets: {
      JAVASCRIPT: `var ladderLength = function(beginWord, endWord, wordList) {
    // Write your solution here
};`,
      PYTHON: `class Solution:
    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
        # Write your solution here
        pass`,
    },
    hints: "Use BFS to find shortest path with word transformations",
  },

  {
    title: "Permutations",
    description:
      "Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.",
    difficulty: "MEDIUM",
    tags: ["Backtracking", "Meta", "Medium"],
    examples: {
      example1: {
        input: "nums = [1,2,3]",
        output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]",
        explanation: "All permutations of [1,2,3].",
      },
    },
    constraints: "1 <= nums.length <= 6, -10 <= nums[i] <= 10",
    testcases: [
      { input: "[1,2,3]", output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]" },
      { input: "[0,1]", output: "[[0,1],[1,0]]" },
    ],
    codeSnippets: {
      JAVASCRIPT: `var permute = function(nums) {
    // Write your solution here
};`,
      PYTHON: `class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        # Write your solution here
        pass`,
    },
    hints: "Use backtracking with recursion",
  },

  // Hard Problems
  {
    title: "Regular Expression Matching",
    description:
      "Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where '.' matches any single character and '*' matches zero or more of the preceding element.",
    difficulty: "HARD",
    tags: ["Dynamic Programming", "String", "Apple", "Hard"],
    examples: {
      example1: {
        input: 's = "aa", p = "a"',
        output: "false",
        explanation: "a does not match the entire string aa.",
      },
    },
    constraints: "1 <= s.length <= 20, 1 <= p.length <= 30",
    testcases: [
      { input: '"aa","a"', output: "false" },
      { input: '"aa","a*"', output: "true" },
      { input: '"ab",".*"', output: "true" },
    ],
    codeSnippets: {
      JAVASCRIPT: `var isMatch = function(s, p) {
    // Write your solution here
};`,
      PYTHON: `class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        # Write your solution here
        pass`,
    },
    hints: "Use dynamic programming with memoization",
  },

  {
    title: "Serialize and Deserialize Binary Tree",
    description:
      "Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network. Design an algorithm to serialize and deserialize a binary tree.",
    difficulty: "HARD",
    tags: ["Tree", "Google", "Hard"],
    examples: {
      example1: {
        input: "root = [1,2,3,null,null,4,5]",
        output: "[1,2,3,null,null,4,5]",
        explanation: "Serialized and deserialized tree.",
      },
    },
    constraints: "The number of nodes in the tree is in the range [0, 10^4]",
    testcases: [
      { input: "[1,2,3,null,null,4,5]", output: "[1,2,3,null,null,4,5]" },
    ],
    codeSnippets: {
      JAVASCRIPT: `class Codec {
    serialize(root) {
        // Write your solution here
    }
    deserialize(data) {
        // Write your solution here
    }
}`,
      PYTHON: `class Codec:
    def serialize(self, root):
        # Write your solution here
        pass
    def deserialize(self, data):
        # Write your solution here
        pass`,
    },
    hints: "Use level-order traversal or DFS for serialization",
  },

  // Dynamic Programming
  {
    title: "Climbing Stairs",
    description:
      "You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    difficulty: "EASY",
    tags: ["Dynamic Programming", "Math", "Basics", "Easy"],
    examples: {
      example1: {
        input: "n = 3",
        output: "3",
        explanation: "1+1+1, 1+2, 2+1",
      },
    },
    constraints: "1 <= n <= 45",
    testcases: [
      { input: "3", output: "3" },
      { input: "2", output: "2" },
    ],
    codeSnippets: {
      JAVASCRIPT: `var climbStairs = function(n) {
    // Write your solution here
};`,
      PYTHON: `class Solution:
    def climbStairs(self, n: int) -> int:
        # Write your solution here
        pass`,
    },
    hints: "Fibonacci sequence: dp[i] = dp[i-1] + dp[i-2]",
  },

  {
    title: "Coin Change",
    description:
      "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.",
    difficulty: "MEDIUM",
    tags: ["Dynamic Programming", "Amazon", "Medium"],
    examples: {
      example1: {
        input: "coins = [1,2,5], amount = 5",
        output: "2",
        explanation: "5 = 5, or 5 = 2 + 2 + 1 (2 coins)",
      },
    },
    constraints: "1 <= coins.length <= 12, 1 <= coins[i] <= 2^31 - 1",
    testcases: [
      { input: "[1,2,5]\n5", output: "2" },
      { input: "[2]\n3", output: "-1" },
    ],
    codeSnippets: {
      JAVASCRIPT: `var coinChange = function(coins, amount) {
    // Write your solution here
};`,
      PYTHON: `class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        # Write your solution here
        pass`,
    },
    hints: "Use DP with amount as the state",
  },

  {
    title: "Longest Increasing Subsequence",
    description:
      "Given an integer array nums, return the length of the longest strictly increasing subsequence.",
    difficulty: "MEDIUM",
    tags: ["Dynamic Programming", "Binary Search", "Meta", "Medium"],
    examples: {
      example1: {
        input: "nums = [10,9,2,5,3,7,101,18]",
        output: "4",
        explanation: "The LIS is [2,3,7,101], therefore the length is 4.",
      },
    },
    constraints: "1 <= nums.length <= 2500, -10^4 <= nums[i] <= 10^4",
    testcases: [
      { input: "[10,9,2,5,3,7,101,18]", output: "4" },
      { input: "[0,1,0,4,4,4,3,5,9]", output: "4" },
    ],
    codeSnippets: {
      JAVASCRIPT: `var lengthOfLIS = function(nums) {
    // Write your solution here
};`,
      PYTHON: `class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        # Write your solution here
        pass`,
    },
    hints: "Binary search with DP for O(n log n) solution",
  },
];

async function main() {
  try {
    console.log("🌱 Starting database seeding...");

    // Create admin user if it doesn't exist
    const hashedPassword = await bcryptjs.hash("admin123", 12);
    const adminUser = await prisma.user.upsert({
      where: { email: "admin@algorank.com" },
      update: {},
      create: {
        email: "admin@algorank.com",
        name: "Admin Demo",
        password: hashedPassword,
        role: "ADMIN",
        image: "https://randomuser.me/api/portraits/lego/1.jpg"
      },
    });

    console.log("✅ Demo account ready:");
    console.log("   📧 Email: admin@algorank.com");
    console.log("   🔑 Password: admin123");

    // Seed problems
    let createdCount = 0;
    let skippedCount = 0;

    for (const problem of problems) {
      const existingProblem = await prisma.problem.findFirst({
        where: { title: problem.title },
      });

      if (existingProblem) {
        skippedCount++;
        continue;
      }

      await prisma.problem.create({
        data: {
          title: problem.title,
          description: problem.description,
          difficulty: problem.difficulty,
          tags: problem.tags,
          examples: problem.examples,
          constraints: problem.constraints,
          hints: problem.hints,
          testcases: problem.testcases,
          codeSnippets: problem.codeSnippets,
          userID: adminUser.id,
        },
      });

      createdCount++;
    }

    // Create demo submissions for recruiter account
    console.log("\n📝 Creating demo submissions for recruiter...");
    const easyProblems = await prisma.problem.findMany({
      where: { difficulty: "EASY" },
      take: 3,
    });

    for (const problem of easyProblems) {
      const existingSubmission = await prisma.submission.findFirst({
        where: {
          userID: adminUser.id,
          problemID: problem.id,
        },
      });

      if (!existingSubmission) {
        await prisma.submission.create({
          data: {
            userID: adminUser.id,
            problemID: problem.id,
            sourceCode: "// Solution code",
            language: "JAVASCRIPT",
            stdin: "",
            stdout: "All test cases passed! ✅",
            status: "ACCEPTED",
          },
        });

        // Mark problem as solved
        await prisma.problemSolved.upsert({
          where: {
            userID_problemID: {
              userID: adminUser.id,
              problemID: problem.id,
            },
          },
          update: {},
          create: {
            userID: adminUser.id,
            problemID: problem.id,
          },
        });
      }
    }

    console.log(`✅ Added ${Math.min(3, easyProblems.length)} solved problems to recruiter profile`);

    console.log("\n✅ Seeding completed!");
    console.log(`📝 Created: ${createdCount} new problems`);
    console.log(`⏭️  Skipped: ${skippedCount} existing problems`);
    console.log(`📊 Total problems in database: ${createdCount + skippedCount}`);

    // Print problem statistics
    const problemsByDifficulty = await prisma.problem.groupBy({
      by: ["difficulty"],
      _count: true,
    });

    console.log("\n📈 Problems by difficulty:");
    problemsByDifficulty.forEach((group) => {
      console.log(`   ${group.difficulty}: ${group._count}`);
    });

    // Get all unique tags
    const allProblems = await prisma.problem.findMany({
      select: { tags: true },
    });

    const uniqueTags = new Set();
    allProblems.forEach((p) => {
      p.tags?.forEach((tag) => uniqueTags.add(tag));
    });

    console.log(`\n🏷️  Unique tags: ${uniqueTags.size}`);
    console.log("Tags:", Array.from(uniqueTags).sort().join(", "));

  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
