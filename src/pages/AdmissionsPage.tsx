
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form';
import { Input } from '../components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from "../hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  studentName: z.string().min(2, { message: "Student name must be at least 2 characters." }),
  studentGrade: z.string().min(1, { message: "Please select a grade level." }),
});

const AdmissionsPage = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      studentName: "",
      studentGrade: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Inquiry Submitted",
      description: "We'll contact you soon with more information.",
    });
    console.log(values);
    form.reset();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 mt-24 mb-12">
        <h1 className="text-4xl font-bold text-school-navy font-serif mb-8">Admissions</h1>
        
        <section id="why" className="mb-12">
          <h2 className="text-2xl font-bold text-school-navy font-serif mb-4">Why Choose Us</h2>
          <p className="text-gray-700 mb-4">
            Our Academy provides an exceptional education that balances academic rigor with character development. 
            Our students benefit from small class sizes, personalized attention, and a curriculum that develops the whole child.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Academic Excellence</h3>
              <p className="text-gray-700">Our challenging curriculum prepares students for success in college and beyond.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Nurturing Environment</h3>
              <p className="text-gray-700">We create a supportive community where every student feels valued and included.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Exceptional Faculty</h3>
              <p className="text-gray-700">Our teachers are experts in their fields and dedicated to student success.</p>
            </div>
          </div>
        </section>
        
        <section id="apply" className="mb-12">
          <h2 className="text-2xl font-bold text-school-navy font-serif mb-4">How to Apply</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <ol className="list-decimal pl-5 space-y-4">
              <li className="text-gray-700">
                <span className="font-semibold">Submit an Inquiry</span>: Fill out the form below to receive detailed information about our programs.
              </li>
              <li className="text-gray-700">
                <span className="font-semibold">Schedule a Visit</span>: Tour our campus and meet with our admissions team.
              </li>
              <li className="text-gray-700">
                <span className="font-semibold">Complete Application</span>: Submit the official application form with all required documents.
              </li>
              <li className="text-gray-700">
                <span className="font-semibold">Student Assessment</span>: Prospective students complete age-appropriate assessments.
              </li>
              <li className="text-gray-700">
                <span className="font-semibold">Admissions Decision</span>: Families are notified of the admissions decision.
              </li>
            </ol>
          </div>

          <div className="mt-8 bg-white p-6 border rounded-lg shadow-sm">
            <h3 className="font-bold text-xl mb-4">Request Information</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Parent/Guardian Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Your email address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Your phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="studentName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Student's full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="studentGrade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grade Applying For</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Kindergarten, Grade 3, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="bg-school-gold text-school-navy hover:bg-yellow-600">
                  Submit Inquiry
                </Button>
              </form>
            </Form>
          </div>
        </section>
        
        <section id="tuition" className="mb-12">
          <h2 className="text-2xl font-bold text-school-navy font-serif mb-4">Tuition & Financial Aid</h2>
          <p className="text-gray-700 mb-4">
            We are committed to making our education accessible to families from diverse economic backgrounds. 
            We offer a range of financial aid options and payment plans to assist families.
          </p>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">Grade Level</th>
                  <th className="py-2 px-4 border-b text-left">Annual Tuition</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b">Elementary (K-5)</td>
                  <td className="py-2 px-4 border-b">$15,000</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">Middle School (6-8)</td>
                  <td className="py-2 px-4 border-b">$17,500</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">High School (9-12)</td>
                  <td className="py-2 px-4 border-b">$19,800</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        
        <section id="faq" className="mb-12">
          <h2 className="text-2xl font-bold text-school-navy font-serif mb-4">FAQ</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold">What is the application deadline?</h3>
              <p className="text-gray-700">For the upcoming school year, applications are due by March 1. However, we accept applications on a rolling basis if spaces are available.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold">Do you provide transportation?</h3>
              <p className="text-gray-700">Yes, we offer bus services for students living within a 10-mile radius of the school. Additional fees apply.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold">What is your student-teacher ratio?</h3>
              <p className="text-gray-700">We maintain a 12:1 student-teacher ratio to ensure personalized attention for each student.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold">How do I apply for financial aid?</h3>
              <p className="text-gray-700">Financial aid applications are available online through our parent portal. Families must submit tax information and financial statements for consideration.</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default AdmissionsPage;
